using Microsoft.AspNetCore.Mvc;
using HelloWorld.DTOs;
using HelloWorld.Data;
using Dapper;

namespace HelloWorld.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlogSectionController : ControllerBase
    {
        private readonly DataDapper _dapper;

        public BlogSectionController(DataDapper dapper)
        {
            _dapper = dapper;
        }

        [HttpGet("latest")]
        public async Task<IActionResult> GetLatestPosts()
        {
            // Përdorim LIMIT 3 për MySQL dhe metodën e saktë LoadDataAsync
            string sql = @"
                SELECT 
                    p.post_id AS PostId, 
                    p.title AS Title, 
                    p.description AS Description,
                    (SELECT pi.image_url FROM post_images pi WHERE pi.post_id = p.post_id LIMIT 1) AS ImageUrl
                FROM posts p
                WHERE p.status = 'active'
                ORDER BY p.created_at DESC
                LIMIT 3";

            try
            {
                var posts = await _dapper.LoadDataAsync<LatestPostDto>(sql);
                return Ok(posts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Gabim në server: {ex.Message}");
            }
        }
    }
}