using Portfolio.API.DTOs;

namespace Portfolio.API.Services;

public interface IContactService
{
    Task SendAsync(ContactRequestDto dto);
}
