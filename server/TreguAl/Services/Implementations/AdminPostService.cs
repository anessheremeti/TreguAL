using HelloWorld.Data;
using HelloWorld.DTOs;
using HelloWorld.Services.Interfaces;
using Dapper;

namespace HelloWorld.Services.Implementations
{
    public class AdminPostService : IAdminPostService
    {
        private readonly DataDapper _dapper;

        public AdminPostService(DataDapper dapper)
        {
            _dapper = dapper;
        }

        public async Task<IEnumerable<AdminPostDisplayDto>> GetAllPostsForAdminAsync()
        {
            string sql = @"
                SELECT 
                    p.post_id AS PostId, 
                    p.title AS Title, 
                    p.description AS Description, 
                    p.status AS PostStatus, 
                    p.created_at AS DateCreated,
                    u.full_name AS OwnerName,
                    c.name AS CategoryName,
                    pi.image_url AS ImageUrl
                FROM posts p
                JOIN users u ON p.user_id = u.user_id
                JOIN categories c ON p.category_id = c.category_id
                LEFT JOIN post_images pi ON p.post_id = pi.post_id";

            var rawData = await _dapper.LoadDataAsync<dynamic>(sql);
            var postDictionary = new Dictionary<int, AdminPostDisplayDto>();

            foreach (var row in rawData)
            {
                if (!postDictionary.TryGetValue((int)row.PostId, out AdminPostDisplayDto? post))
                {
                    post = new AdminPostDisplayDto
                    {
                        PostId = (int)row.PostId,
                        Title = row.Title,
                        Description = row.Description,
                        OwnerName = row.OwnerName,
                        CategoryName = row.CategoryName,
                        PostStatus = row.PostStatus,
                        DateCreated = row.DateCreated,
                        ImageUrls = new List<string>()
                    };
                    postDictionary.Add(post.PostId, post);
                }

                if (row.ImageUrl != null)
                {
                    post.ImageUrls.Add(row.ImageUrl);
                }
            }

            return postDictionary.Values;
        }

        // Kjo është metoda që mungonte dhe shkaktonte vizën e kuqe
        public async Task<bool> DeletePostAsync(int postId)
        {
            string sql = "DELETE FROM posts WHERE post_id = @PostId";

            // Supozojmë se DataDapper ka metodë për ekzekutim (ExecuteSql)
            // Nëse metoda jote në DataDapper quhet ndryshe, përshtate emrin këtu
            try
            {
                await _dapper.LoadDataAsync<dynamic>(sql); // Ose ExecuteSqlAsync nëse e ke
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}