using HelloWorld.DTOs;

namespace HelloWorld.Services.Interfaces;

public interface IAdminPostService
{
    Task<IEnumerable<AdminPostDisplayDto>> GetAllPostsForAdminAsync();
    Task<bool> DeletePostAsync(uint postId);
}