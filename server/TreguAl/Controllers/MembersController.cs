using Microsoft.AspNetCore.Mvc;
using HelloWorld.Services.Interfaces;

namespace HelloWorld.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MembersController : ControllerBase
    {
        private readonly IMemberService _memberService;
        public MembersController(IMemberService memberService) 
        {
            _memberService = memberService;
        }

        [HttpGet]
        public async Task<IActionResult> GetMembers()
        {
            try 
            {
                var members = await _memberService.GetAllMembersAsync();
                return Ok(members);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Gabim në server: {ex.Message}");
            }
        }
    }
}