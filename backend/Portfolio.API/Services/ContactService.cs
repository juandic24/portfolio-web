using MailKit.Net.Smtp;
using MimeKit;
using Portfolio.API.DTOs;
using Portfolio.API.Models;
using Portfolio.API.Repositories;

namespace Portfolio.API.Services;

public class ContactService(IContactRepository repo, IConfiguration config, ILogger<ContactService> logger) : IContactService
{
    public async Task SendAsync(ContactRequestDto dto)
    {
        var message = new ContactMessage
        {
            Name = dto.Name,
            Email = dto.Email,
            Message = dto.Message
        };
        await repo.SaveAsync(message);

        try
        {
            await SendEmailAsync(dto);
        }
        catch (MailKit.Net.Smtp.SmtpCommandException ex)
        {
            logger.LogError(ex, "SMTP command rejected (status {Status}) for {Email}", ex.StatusCode, dto.Email);
        }
        catch (MailKit.Net.Smtp.SmtpProtocolException ex)
        {
            logger.LogError(ex, "SMTP protocol error for {Email}", dto.Email);
        }
        catch (System.Net.Sockets.SocketException ex)
        {
            logger.LogError(ex, "SMTP connection failed to {Host}:{Port} — port may be blocked",
                config["Smtp:Host"], config["Smtp:Port"]);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Email delivery failed for {Email}: {Type} — {Message}",
                dto.Email, ex.GetType().Name, ex.Message);
        }
    }

    private async Task SendEmailAsync(ContactRequestDto dto)
    {
        var smtpHost = config["Smtp:Host"];
        var smtpPort = int.TryParse(config["Smtp:Port"], out var port) ? port : 587;
        var smtpUser = config["Smtp:User"];
        var smtpPass = config["Smtp:Pass"];
        var receiver = config["Smtp:ContactReceiver"];

        if (string.IsNullOrEmpty(smtpHost) || string.IsNullOrEmpty(smtpUser)) return;

        var email = new MimeMessage();
        email.From.Add(new MailboxAddress("Portfolio Contact", smtpUser));
        email.To.Add(MailboxAddress.Parse(string.IsNullOrEmpty(receiver) ? smtpUser : receiver));
        email.Subject = $"[Portfolio] New message from {dto.Name}";
        email.Body = new TextPart("plain")
        {
            Text = $"Name: {dto.Name}\nEmail: {dto.Email}\n\nMessage:\n{dto.Message}"
        };

        logger.LogInformation("Sending email via {Host}:{Port} as {User}", smtpHost, smtpPort, smtpUser);

        using var client = new SmtpClient();
        await client.ConnectAsync(smtpHost, smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
        await client.AuthenticateAsync(smtpUser, smtpPass ?? string.Empty);
        await client.SendAsync(email);
        await client.DisconnectAsync(true);
    }
}
