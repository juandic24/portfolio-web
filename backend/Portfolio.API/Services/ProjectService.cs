using Portfolio.API.DTOs;
using Portfolio.API.Models;
using Portfolio.API.Repositories;

namespace Portfolio.API.Services;

public class ProjectService(IProjectRepository repo) : IProjectService
{
    public async Task<IEnumerable<ProjectDto>> GetAllAsync() =>
        (await repo.GetAllAsync()).Select(ToDto);

    public async Task<ProjectDto?> GetByIdAsync(int id)
    {
        var project = await repo.GetByIdAsync(id);
        return project is null ? null : ToDto(project);
    }

    public async Task<ProjectDto> CreateAsync(CreateProjectDto dto)
    {
        var project = new Project
        {
            Title = dto.Title,
            ShortDescription = dto.ShortDescription,
            FullDescription = dto.FullDescription,
            Technologies = dto.Technologies,
            GitHubUrl = dto.GitHubUrl,
            LiveUrl = dto.LiveUrl,
            ImageUrl = dto.ImageUrl,
            IsFeatured = dto.IsFeatured
        };
        var created = await repo.CreateAsync(project);
        return ToDto(created);
    }

    public async Task<ProjectDto?> UpdateAsync(int id, UpdateProjectDto dto)
    {
        var project = new Project
        {
            Title = dto.Title,
            ShortDescription = dto.ShortDescription,
            FullDescription = dto.FullDescription,
            Technologies = dto.Technologies,
            GitHubUrl = dto.GitHubUrl,
            LiveUrl = dto.LiveUrl,
            ImageUrl = dto.ImageUrl,
            IsFeatured = dto.IsFeatured
        };
        var updated = await repo.UpdateAsync(id, project);
        return updated is null ? null : ToDto(updated);
    }

    public Task<bool> DeleteAsync(int id) => repo.DeleteAsync(id);

    private static ProjectDto ToDto(Project p) => new(
        p.Id, p.Title, p.ShortDescription, p.FullDescription,
        p.Technologies, p.GitHubUrl, p.LiveUrl, p.ImageUrl,
        p.IsFeatured, p.CreatedAt
    );
}
