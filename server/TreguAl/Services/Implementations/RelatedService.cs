using HelloWorld.Data;
using HelloWorld.Models;
using HelloWorld.Services.Interfaces;

namespace HelloWorld.Services.Implementations
{
    public class RelatedService : IRelatedService
    {
        private readonly DataDapper _dapper;

        public RelatedService(DataDapper dapper)
        {
            _dapper = dapper;
        }

        public async Task<IEnumerable<Post>> GetRelatedPostsAsync(int categoryId, int excludePostId)
        {
            string sqlPosts = @"
        SELECT post_id AS PostId, 
               category_id AS CategoryId, 
               title AS Title, 
               description AS Description, 
               status AS Status, 
               created_at AS CreatedAt 
        FROM posts 
        WHERE category_id = @CategoryId 
        AND post_id != @ExcludeId 
        AND status = 'active'
        ORDER BY created_at DESC 
        LIMIT 4";

            // Kujdes këtu: Emrat në të djathtë (CategoryId, ExcludeId) 
            // duhet të përputhen fiks me ato në SQL query (@CategoryId, @ExcludeId)
            var posts = await _dapper.LoadDataAsync<Post>(sqlPosts, new
            {
                CategoryId = categoryId,
                ExcludeId = excludePostId
            });

            foreach (var post in posts)
            {
                // Sigurohu që fusha quhet post_id në tabelën post_images
                string sqlImages = "SELECT image_url AS ImageUrl FROM post_images WHERE post_id = @PId LIMIT 1";
                var images = await _dapper.LoadDataAsync<PostImage>(sqlImages, new { PId = post.PostId });

                post.Images = images.ToList();
            }

            return posts;
        }
    }
}