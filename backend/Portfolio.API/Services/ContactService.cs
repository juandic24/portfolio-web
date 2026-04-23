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
        catch (Exception ex)
        {
            logger.LogWarning(ex, "Email delivery failed for contact from {Email}", dto.Email);
        }
    }

    private async Task SendEmailAsync(ContactRequestDto dto)
    {
        var smtpHost = config["Smtp:Host"];
        var smtpPort = int.Parse(config["Smtp:Port"] ?? "587");
        var smtpUser = config["Smtp:User"];
        var smtpPass = config["Smtp:Pass"];
        var receiver = config["Smtp:ContactReceiver"];

        if (string.IsNullOrEmpty(smtpHost) || string.IsNullOrEmpty(smtpUser)) return;

        var email = new MimeMessage();
        email.From.Add(new MailboxAddress("Portfolio Contact", smtpUser));
        email.To.Add(MailboxAddress.Parse(receiver ?? smtpUser));
        email.Subject = $"[Portfolio] Mensaje de {dto.Name}";
        email.Body = new TextPart("plain")
        {
            Text = $"Nombre: {dto.Name}\nEmail: {dto.Email}\n\nMensaje:\n{dto.Message}"
        };

        logger.LogInformation(
            "Attempting SMTP connection — Host: {Host}, Port: {Port}, User: {User}",
            smtpHost, smtpPort, smtpUser);

        using var client = new SmtpClient();
        try
        {
            await client.ConnectAsync(smtpHost, smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(smtpUser, smtpPass ?? string.Empty);
            await client.SendAsync(email);
            await client.DisconnectAsync(true);
        }
        catch (Exception ex)
        {
            var inner = ex.InnerException;
            logger.LogError(
                ex,
                "SMTP operation failed — {Message}{InnerMessage}",
                ex.Message,
                inner is not null ? $" | Inner: {inner.Message}" : string.Empty);
            throw;
        }
    }
}
