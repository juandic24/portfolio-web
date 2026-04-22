using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data;
using Portfolio.API.Models;

namespace Portfolio.API.Repositories;

public class ContactRepository(AppDbContext db) : IContactRepository
{
    public async Task SaveAsync(ContactMessage message)
    {
        db.ContactMessages.Add(message);
        await db.SaveChangesAsync();
    }

    public async Task<IEnumerable<ContactMessage>> GetAllAsync() =>
        await db.ContactMessages.OrderByDescending(m => m.SentAt).ToListAsync();
}
