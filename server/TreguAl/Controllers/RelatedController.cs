using Microsoft.AspNetCore.Mvc;
using HelloWorld.Services.Interfaces;

namespace HelloWorld.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RelatedController : ControllerBase
    {
        private readonly IRelatedService _relatedService;

        public RelatedController(IRelatedService relatedService)
        {
            _relatedService = relatedService;
        }

        [HttpGet("{categoryId}")]
        public async Task<IActionResult> GetRelated(int categoryId, [FromQuery] int excludeId)
        {
            var results = await _relatedService.GetRelatedPostsAsync(categoryId, excludeId);
            return Ok(results);
        }
    }
}