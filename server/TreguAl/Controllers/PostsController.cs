using HelloWorld.Interfaces;
using HelloWorld.Models;
using Microsoft.AspNetCore.Mvc;

namespace HelloWorld.Controllers;

[ApiController]
[Route("api/posts")]
public class PostsController : ControllerBase
{
    private readonly IPostService _service;

    public PostsController(IPostService service)
    {
        _service = service;
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
