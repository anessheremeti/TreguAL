using HelloWorld.Interfaces;
using HelloWorld.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System;
using System.Linq;
using CloudinaryDotNet;


namespace HelloWorld.Controllers;

[ApiController]
[Route("api/posts")]
public class PostsController : ControllerBase
{
    private readonly IPostService _service;
private readonly IWebHostEnvironment _env;

private readonly Cloudinary _cloudinary;

 public PostsController(IPostService service, IWebHostEnvironment env,Cloudinary cloudinary)
{
    _service = service;
    _env = env;
        _cloudinary = cloudinary;

}
[Authorize]
[HttpGet("me")]
public async Task<IActionResult> GetMyPosts()
{
    var userIdClaim = User.FindFirstValue("user_id")
        ?? User.FindFirstValue(ClaimTypes.NameIdentifier);

    if (!uint.TryParse(userIdClaim, out var userId))
        return Unauthorized();

    var posts = await _service.GetByUserAsync(userId);

    // ✅ Siguro postId në response (camelCase) dhe normalizo imazhet
    var result = posts.Select(p => new
    {
        postId = p.PostId,
        title = p.Title,
        description = p.Description,
        phoneNumber = p.PhoneNumber,
        categoryId = p.CategoryId,
        userId = p.UserId,
        createdAt = p.CreatedAt,
        images = (p.Images ?? new List<PostImage>()).Select(img => new
        {
            postImageId = img.PostImageId,
            postId = img.PostId,
            imageUrl = img.ImageUrl,
            createdAt = img.CreatedAt
        }).ToList()
    });

    return Ok(result);
}

[Authorize]
[HttpPost("create-with-images")]
[RequestSizeLimit(50_000_000)]
public async Task<IActionResult> CreateWithImages([FromForm] CreatePostFormDto dto)
{
    var userIdClaim = User.FindFirstValue("user_id")
        ?? User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (dto.CategoryId == 0)
    return BadRequest("CategoryId është i detyrueshëm");

if (string.IsNullOrWhiteSpace(dto.PhoneNumber))
    return BadRequest("PhoneNumber është i detyrueshëm");

if (dto.Images.Count > 3)
    return BadRequest("Maksimumi 3 foto për post");


    if (!uint.TryParse(userIdClaim, out var userId))
        return Unauthorized("Tokeni nuk ka user_id");

    if (dto.Images == null || dto.Images.Count == 0)
        return BadRequest("Duhet të ngarkosh të paktën 1 foto");

    var post = new Post
    {
        UserId = userId,
        CategoryId = dto.CategoryId,
        Title = dto.Title,
        Description = dto.Description,
        PhoneNumber = dto.PhoneNumber
    };

    var postId = await _service.CreateAsync(post);

    var wwwroot = _env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
    var folder = Path.Combine(wwwroot, "uploads", "posts", postId.ToString());
    Directory.CreateDirectory(folder);

    foreach (var file in dto.Images)
    {
        var ext = Path.GetExtension(file.FileName);
        var fileName = $"{Guid.NewGuid():N}{ext}";
        var fullPath = Path.Combine(folder, fileName);

        using var stream = System.IO.File.Create(fullPath);
        await file.CopyToAsync(stream);

        var imageUrl = $"/uploads/posts/{postId}/{fileName}";
        await _service.AddImageAsync(postId, imageUrl);
    }

    return CreatedAtAction(nameof(Get), new { id = postId }, new { postId });
}


    [HttpGet]
    public async Task<IActionResult> GetAll()
        => Ok(await _service.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(uint id)
    {
        var post = await _service.GetByIdAsync(id);
        return post == null ? NotFound() : Ok(post);
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> ByUser(uint userId)
        => Ok(await _service.GetByUserAsync(userId));

    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string q)
        => Ok(await _service.SearchAsync(q));

    [HttpPost]
    public async Task<IActionResult> Create(Post post)
    {
        var id = await _service.CreateAsync(post);
        return CreatedAtAction(nameof(Get), new { id }, post);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(uint id, Post post)
    {
        post.PostId = id;
        return await _service.UpdateAsync(post) ? Ok() : NotFound();
    }

    [HttpPut("{id}/sold")]
    public async Task<IActionResult> MarkSold(uint id)
        => await _service.MarkAsSoldAsync(id) ? Ok() : NotFound();

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(uint id)
        => await _service.DeleteAsync(id) ? Ok() : NotFound();

    [HttpPost("{id}/images")]
    public async Task<IActionResult> AddImage(uint id, [FromBody] string imageUrl)
        => await _service.AddImageAsync(id, imageUrl) ? Ok() : BadRequest();
}
