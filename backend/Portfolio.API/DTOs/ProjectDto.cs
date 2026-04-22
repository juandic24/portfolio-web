namespace Portfolio.API.DTOs;

public record ProjectDto(
    int Id,
    string Title,
    string ShortDescription,
    string FullDescription,
    string[] Technologies,
    string GitHubUrl,
    string? LiveUrl,
    string? ImageUrl,
    bool IsFeatured,
    DateTime CreatedAt
);

public record CreateProjectDto(
    string Title,
    string ShortDescription,
    string FullDescription,
    string[] Technologies,
    string GitHubUrl,
    string? LiveUrl,
    string? ImageUrl,
    bool IsFeatured
);

public record UpdateProjectDto(
    string Title,
    string ShortDescription,
    string FullDescription,
    string[] Technologies,
    string GitHubUrl,
    string? LiveUrl,
    string? ImageUrl,
    bool IsFeatured
);
