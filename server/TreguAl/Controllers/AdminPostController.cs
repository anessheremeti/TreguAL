using HelloWorld.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HelloWorld.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminPostController : ControllerBase
    {
        private readonly IAdminPostService _postService;

        public AdminPostController(IAdminPostService postService)
        {
            _postService = postService;
        }

        // GET: api/AdminPost/list
        [HttpGet("list")]
        public async Task<IActionResult> GetAdminPosts()
        {
            var results = await _postService.GetAllPostsForAdminAsync();
            return Ok(results);
        }

        // DELETE: api/AdminPost/{id}
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeletePost(uint id)
        {
            if (id == 0)
                return BadRequest("Post ID nuk është valid.");

            var deleted = await _postService.DeletePostAsync(id);

            if (!deleted)
                return NotFound($"Post me ID={id} nuk u gjet.");

            return NoContent(); // 204 – Best practice për DELETE
        }
    }
}
