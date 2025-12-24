using Microsoft.AspNetCore.Mvc;
using HelloWorld.Services.Interfaces;

namespace HelloWorld.Controllers
{
    [ApiController]
    [Route("api/posts")] // Kjo mbetet kështu sepse React e kërkon këtë rrugë
    public class FeaturedController : ControllerBase
    {
        private readonly IHomeManager _homeManager;

        public FeaturedController(IHomeManager homeManager)
        {
            _homeManager = homeManager;
        }

        [HttpGet("featured")]
        public async Task<IActionResult> GetFeatured()
        {
            var result = await _homeManager.GetTopThreeProducts();
            return Ok(result);
        }
    }
}