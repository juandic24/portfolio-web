using Portfolio.API.Models;

namespace Portfolio.API.Repositories;

public interface IContactRepository
{
    Task SaveAsync(ContactMessage message);
    Task<IEnumerable<ContactMessage>> GetAllAsync();
}
