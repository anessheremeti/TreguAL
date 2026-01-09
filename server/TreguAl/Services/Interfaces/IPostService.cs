using HelloWorld.Models;

namespace HelloWorld.Interfaces;

public interface IPostService
{
    Task<IEnumerable<Post>> GetAllAsync();
    Task<Post?> GetByIdAsync(uint postId);
    Task<IEnumerable<Post>> GetByUserAsync(uint userId);
    Task<IEnumerable<Post>> SearchAsync(string query);

    Task<uint> CreateAsync(Post post);
    Task<bool> UpdateAsync(Post post);
    Task<bool> MarkAsSoldAsync(uint postId);
    Task<bool> DeleteAsync(uint postId);

    Task<bool> AddImageAsync(uint postId, string imageUrl);
    Task<IEnumerable<PostImage>> GetImagesAsync(uint postId);

    // Migrate relative image URLs (e.g. "/uploads/...") to absolute by prefixing the provided base URL
    Task<int> MigrateRelativeImageUrlsAsync(string baseUrl);
}
