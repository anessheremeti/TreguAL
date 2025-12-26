using Dapper;
using Domain.Entities;
using HelloWorld.Interfaces;
using HelloWorld.Models;
using MySqlConnector;

namespace HelloWorld.Services;

public class CategoryService : ICategoryService
{
    private readonly string _cs;

    public CategoryService(IConfiguration config)
    {
        _cs = config.GetConnectionString("DefaultConnection")!;
    }

    private MySqlConnection Conn() => new(_cs);

 
    public async Task<IEnumerable<Category>> GetAllAsync()
    {
        const string sql = @"
            SELECT
                category_id AS CategoryId,
                name,
                parent_category_id AS ParentCategoryId
            FROM categories
            ORDER BY name
        ";

        using var db = Conn();
        return await db.QueryAsync<Category>(sql);
    }

    
    public async Task<Category?> GetByIdAsync(uint categoryId)
    {
        const string sql = @"
            SELECT
                category_id AS CategoryId,
                name,
                parent_category_id AS ParentCategoryId
            FROM categories
            WHERE category_id = @categoryId
            LIMIT 1
        ";

        using var db = Conn();
        return await db.QuerySingleOrDefaultAsync<Category>(sql, new { categoryId });
    }

   
    public async Task<IEnumerable<Category>> GetByUserAsync(uint userId)
    {
        return await GetAllAsync();
    }

    
    public async Task<IEnumerable<Category>> SearchAsync(string query)
    {
        const string sql = @"
            SELECT
                category_id AS CategoryId,
                name,
                parent_category_id AS ParentCategoryId
            FROM categories
            WHERE name LIKE CONCAT('%', @query, '%')
            ORDER BY name
        ";

        using var db = Conn();
        return await db.QueryAsync<Category>(sql, new { query });
    }

  
    public async Task<uint> CreateAsync(Category category)
    {
        const string sql = @"
            INSERT INTO categories (name, parent_category_id)
            VALUES (@Name, @ParentCategoryId);
            SELECT LAST_INSERT_ID();
        ";

        using var db = Conn();
        return await db.ExecuteScalarAsync<uint>(sql, category);
    }

    public async Task<bool> UpdateAsync(Category category)
    {
        const string sql = @"
            UPDATE categories SET
                name = @Name,
                parent_category_id = @ParentCategoryId
            WHERE category_id = @CategoryId
        ";

        using var db = Conn();
        return await db.ExecuteAsync(sql, category) > 0;
    }

    
    public async Task<bool> DeleteAsync(uint categoryId)
    {
        const string sql = @"
            DELETE FROM categories
            WHERE category_id = @categoryId
        ";

        using var db = Conn();
        return await db.ExecuteAsync(sql, new { categoryId }) > 0;
    }
}
