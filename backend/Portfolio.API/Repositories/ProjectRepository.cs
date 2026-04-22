using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data;
using Portfolio.API.Models;

namespace Portfolio.API.Repositories;

public class ProjectRepository(AppDbContext db) : IProjectRepository
{
    public async Task<IEnumerable<Project>> GetAllAsync() =>
        await db.Projects.OrderByDescending(p => p.IsFeatured).ThenByDescending(p => p.CreatedAt).ToListAsync();

    public async Task<Project?> GetByIdAsync(int id) =>
        await db.Projects.FindAsync(id);

    public async Task<Project> CreateAsync(Project project)
    {
        db.Projects.Add(project);
        await db.SaveChangesAsync();
        return project;
    }

    public async Task<Project?> UpdateAsync(int id, Project updated)
    {
        var existing = await db.Projects.FindAsync(id);
        if (existing is null) return null;

        existing.Title = updated.Title;
        existing.ShortDescription = updated.ShortDescription;
        existing.FullDescription = updated.FullDescription;
        existing.Technologies = updated.Technologies;
        existing.GitHubUrl = updated.GitHubUrl;
        existing.LiveUrl = updated.LiveUrl;
        existing.ImageUrl = updated.ImageUrl;
        existing.IsFeatured = updated.IsFeatured;

        await db.SaveChangesAsync();
        return existing;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var project = await db.Projects.FindAsync(id);
        if (project is null) return false;

        db.Projects.Remove(project);
        await db.SaveChangesAsync();
        return true;
    }
}
