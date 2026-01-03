using HelloWorld.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HelloWorld.Controllers
{
    [ApiController]
    [Route("api/ads")]
    public class AdsController : ControllerBase
    {
        private readonly IAdsService _ads;

        public AdsController(IAdsService ads)
        {
            _ads = ads;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = await _ads.GetAllAsync();
            return Ok(items);
        }

        [Authorize]
        [HttpPost]
        [RequestSizeLimit(20_000_000)]
        public async Task<IActionResult> Create([FromForm] CreateAdDto dto)
        {
            if (dto == null) return BadRequest("Payload mungon.");
            if (dto.Image == null) return BadRequest("Foto mungon.");

            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!uint.TryParse(userIdStr, out var userId))
                return Unauthorized("UserId mungon në token.");

            var id = await _ads.CreateAsync(userId, dto.Title, dto.Description, dto.Image);

            return Ok(new { adId = id });
        }

        [Authorize]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0) return BadRequest("Id e pavlefshme.");

            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!uint.TryParse(userIdStr, out var userId))
                return Unauthorized("UserId mungon në token.");

            var ok = await _ads.DeleteAsync((uint)id, userId);
            if (!ok) return NotFound();

            return NoContent();
        }
    }
}
