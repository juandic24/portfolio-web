using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Portfolio.API.DTOs;

namespace Portfolio.API.Services;

public class AuthService(IConfiguration config) : IAuthService
{
    public TokenResponseDto? Login(LoginDto dto)
    {
        var adminEmail = config["Admin:Email"];
        var adminPassword = config["Admin:Password"];

        if (dto.Email != adminEmail || dto.Password != adminPassword)
            return null;

        var secret = config["Jwt:Secret"] ?? throw new InvalidOperationException("JWT secret not configured");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expires = DateTime.UtcNow.AddHours(8);

        var token = new JwtSecurityToken(
            issuer: config["Jwt:Issuer"],
            audience: config["Jwt:Audience"],
            claims: [new Claim(ClaimTypes.Email, dto.Email), new Claim(ClaimTypes.Role, "Admin")],
            expires: expires,
            signingCredentials: creds
        );

        return new TokenResponseDto(new JwtSecurityTokenHandler().WriteToken(token), expires);
    }
}
