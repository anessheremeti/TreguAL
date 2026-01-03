using HelloWorld.Models;
using Microsoft.AspNetCore.Http;

namespace HelloWorld.Services.Interfaces
{
    public interface IAdsService
    {
        Task<int> CreateAsync(uint userId, string? title, string? description, IFormFile image);
        Task<bool> DeleteAsync(uint adId, uint userId);
        Task<List<AdDto>> GetAllAsync();
    }
}
