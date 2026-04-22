using System.ComponentModel.DataAnnotations;

namespace Portfolio.API.DTOs;

public record LoginDto(
    [Required, EmailAddress] string Email,
    [Required] string Password
);

public record TokenResponseDto(string Token, DateTime ExpiresAt);
