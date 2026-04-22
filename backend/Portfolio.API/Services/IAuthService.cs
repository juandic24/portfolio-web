using Portfolio.API.DTOs;

namespace Portfolio.API.Services;

public interface IAuthService
{
    TokenResponseDto? Login(LoginDto dto);
}
