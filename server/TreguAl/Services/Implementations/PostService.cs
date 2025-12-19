using Dapper;
using HelloWorld.Interfaces;
using HelloWorld.Models;
using MySqlConnector;

namespace HelloWorld.Services;

public class PostService : IPostService
{
    private readonly string _cs;

    public PostService(IConfiguration config)
    {
        _cs = config.GetConnectionString("DefaultConnection")!;
    }

    private MySqlConnection Conn() => new(_cs);

  public async Task<IEnumerable<Post>> GetAllAsync()
{
    const string sql = @"
        SELECT
            post_id AS PostId,
            user_id AS UserId,
            category_id AS CategoryId,
            title,
            description,
            phone_number AS PhoneNumber,
            status,
            created_at AS CreatedAt,
            updated_at AS UpdatedAt
        FROM posts
        WHERE status = 'active'
    ";

    using var db = Conn();
    var posts = (await db.QueryAsync<Post>(sql)).ToList();

    if (!posts.Any())
        return posts;

    const string imgSql = @"
        SELECT
            post_image_id AS PostImageId,
            post_id AS PostId,
            image_url AS ImageUrl,
            created_at AS CreatedAt
        FROM post_images
        WHERE post_id IN @PostIds
    ";

    var images = await db.QueryAsync<PostImage>(
        imgSql,
        new { PostIds = posts.Select(p => p.PostId).ToArray() }
    );

    var imagesByPost = images.GroupBy(i => i.PostId)
                             .ToDictionary(g => g.Key, g => g.ToList());

    foreach (var post in posts)
    {
        if (imagesByPost.TryGetValue(post.PostId, out var imgs))
            post.Images = imgs;
    }

    return posts;
}


    public async Task<Post?> GetByIdAsync(uint postId)
{
    const string sql = @"
        SELECT
            post_id AS PostId,
            user_id AS UserId,
            category_id AS CategoryId,
            title,
            description,
            phone_number AS PhoneNumber,
            status,
            created_at AS CreatedAt,
            updated_at AS UpdatedAt
        FROM posts
        WHERE post_id = @postId
        LIMIT 1
    ";

    using var db = Conn();

    var post = await db.QuerySingleOrDefaultAsync<Post>(sql, new { postId });
    if (post == null)
        return null;

    const string imgSql = @"
        SELECT
            post_image_id AS PostImageId,
            post_id AS PostId,
            image_url AS ImageUrl,
            created_at AS CreatedAt
        FROM post_images
        WHERE post_id = @postId
    ";

    var images = await db.QueryAsync<PostImage>(imgSql, new { postId });
    post.Images = images.ToList();

    return post;
}


    public async Task<IEnumerable<Post>> GetByUserAsync(uint userId)
    {
        const string sql = @"SELECT * FROM posts WHERE user_id = @userId";
        using var db = Conn();
        return await db.QueryAsync<Post>(sql, new { userId });
    }

    public async Task<IEnumerable<Post>> SearchAsync(string query)
    {
        const string sql = @"
        SELECT * FROM posts
        WHERE MATCH(title, description) AGAINST(@q IN NATURAL LANGUAGE MODE)";
        using var db = Conn();
        return await db.QueryAsync<Post>(sql, new { q = query });
    }

    public async Task<uint> CreateAsync(Post post)
    {
        const string sql = @"
        INSERT INTO posts (user_id, category_id, title, description, phone_number)
        VALUES (@UserId, @CategoryId, @Title, @Description, @PhoneNumber);
        SELECT LAST_INSERT_ID();";

        using var db = Conn();
        return await db.ExecuteScalarAsync<uint>(sql, post);
    }

    public async Task<bool> UpdateAsync(Post post)
    {
        const string sql = @"
        UPDATE posts SET
          title = @Title,
          description = @Description,
          phone_number = @PhoneNumber
        WHERE post_id = @PostId";

        using var db = Conn();
        return await db.ExecuteAsync(sql, post) > 0;
    }

    public async Task<bool> MarkAsSoldAsync(uint postId)
    {
        const string sql = @"UPDATE posts SET status = 'sold' WHERE post_id = @postId";
        using var db = Conn();
        return await db.ExecuteAsync(sql, new { postId }) > 0;
    }

    public async Task<bool> DeleteAsync(uint postId)
    {
        const string sql = @"DELETE FROM posts WHERE post_id = @postId";
        using var db = Conn();
        return await db.ExecuteAsync(sql, new { postId }) > 0;
    }

    public async Task<bool> AddImageAsync(uint postId, string imageUrl)
    {
        const string sql = @"
        INSERT INTO post_images (post_id, image_url)
        VALUES (@postId, @imageUrl)";

        using var db = Conn();
        return await db.ExecuteAsync(sql, new { postId, imageUrl }) > 0;
    }

    public async Task<IEnumerable<PostImage>> GetImagesAsync(uint postId)
    {
        const string sql = @"SELECT * FROM post_images WHERE post_id = @postId";
        using var db = Conn();
        return await db.QueryAsync<PostImage>(sql, new { postId });
    }
}
