using System.ComponentModel.DataAnnotations;

namespace Portfolio.API.DTOs;

public record ContactRequestDto(
    [Required, MinLength(2)] string Name,
    [Required, EmailAddress] string Email,
    [Required, MinLength(10), MaxLength(2000)] string Message
);
