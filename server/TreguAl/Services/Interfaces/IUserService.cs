using Application.DTOs;
using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> CreateAsync(CreateUserDto dto);
        Task<UserDto?> GetByIdAsync(uint userId);

          Task<UserDto> UpdateUserAsync(int id, User users);
        Task<bool> DeleteUserAsync(int id);
        Task<IEnumerable<UserDto>> GetAllAsync();
    }
}
