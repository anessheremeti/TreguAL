using Application.DTOs;
using Application.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

// ✅ SHTO KETO 2 (pa preke pjeset tjera)
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace API.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUserDto dto)
        {
            var result = await _userService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = result.UserId }, result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var result = await _userService.LoginAsync(dto);
            return Ok(result);
        }

        // ✅ SHTESE: GET /api/users/me
        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetMe()
        {
            var userIdClaim = User.FindFirstValue("user_id")
                ?? User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!uint.TryParse(userIdClaim, out var userId))
                return Unauthorized();

            var user = await _userService.GetByIdAsync(userId); // kthen UserDto
            if (user == null) return NotFound();

            return Ok(new
            {
                user.UserId,
                user.FullName,
                user.Email,
                user.PhoneNumber
            });
        }

        // ✅ SHTESE: PUT /api/users/me
        // ⚠️ KJO KERKON qe ta kesh metoden UpdateMeAsync ne IUserService + UserService
        [Authorize]
        [HttpPut("me")]
        public async Task<IActionResult> UpdateMe([FromBody] UpdateMeDto dto)
        {
            var userIdClaim = User.FindFirstValue("user_id")
                ?? User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!uint.TryParse(userIdClaim, out var userId))
                return Unauthorized();

            var ok = await _userService.UpdateMeAsync(userId, dto);
            return ok ? Ok() : NotFound();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(uint id)
        {
            var user = await _userService.GetByIdAsync(id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _userService.GetAllAsync());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, User users)
        {
            var updatedUser = await _userService.UpdateUserAsync(id, users);
            return Ok(updatedUser);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _userService.DeleteUserAsync(id);
            return result ? Ok() : NotFound();
        }
    }
}
