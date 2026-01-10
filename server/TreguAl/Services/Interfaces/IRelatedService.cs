using HelloWorld.Models;

namespace HelloWorld.Services.Interfaces
{
    public interface IRelatedService
    {
        Task<IEnumerable<Post>> GetRelatedPostsAsync(int categoryId, int excludePostId);
    }
}