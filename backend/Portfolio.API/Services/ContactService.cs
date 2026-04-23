using System.Net.Http.Headers;
using Portfolio.API.DTOs;
using Portfolio.API.Models;
using Portfolio.API.Repositories;

namespace Portfolio.API.Services;

public class ContactService(IContactRepository repo, IConfiguration config, ILogger<ContactService> logger, IHttpClientFactory httpClientFactory) : IContactService
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
            logger.LogError(ex, "Email delivery failed for {Email}: {Type} — {Message}",
                dto.Email, ex.GetType().Name, ex.Message);
        }
    }

    private async Task SendEmailAsync(ContactRequestDto dto)
    {
        var apiKey = config["Resend:ApiKey"];
        var from = config["Resend:From"];
        var receiver = config["Resend:ContactReceiver"];

        if (string.IsNullOrEmpty(apiKey) || string.IsNullOrEmpty(from)) return;

        var to = string.IsNullOrEmpty(receiver) ? from : receiver;

        logger.LogInformation("Sending email via Resend from {From} to {To}", from, to);

        var http = httpClientFactory.CreateClient();
        http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

        var payload = new
        {
            from,
            to = new[] { to },
            subject = $"[Portfolio] New message from {dto.Name}",
            text = $"Name: {dto.Name}\nEmail: {dto.Email}\n\nMessage:\n{dto.Message}"
        };

        var response = await http.PostAsJsonAsync("https://api.resend.com/emails", payload);

        if (!response.IsSuccessStatusCode)
        {
            var body = await response.Content.ReadAsStringAsync();
            logger.LogError("Resend API error {Status}: {Body}", response.StatusCode, body);
            return;
        }

        logger.LogInformation("Email sent via Resend successfully");
    }
}
