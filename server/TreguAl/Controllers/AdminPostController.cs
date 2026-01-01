using HelloWorld.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HelloWorld.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // Ky atribut e bën rrugën: api/AdminPost
    public class AdminPostController : ControllerBase
    {
        private readonly IAdminPostService _postService;

        public AdminPostController(IAdminPostService postService)
        {
            _postService = postService;
        }

        [HttpGet("list")] // Ky atribut shton pjesën: /list
        public async Task<IActionResult> GetAdminPosts()
        {
            var results = await _postService.GetAllPostsForAdminAsync();
            return Ok(results);
        }
    }
}