using Domain.Entities;
using HelloWorld.Interfaces;
using HelloWorld.Models;
using Microsoft.AspNetCore.Mvc;

namespace HelloWorld.Controllers;

[ApiController]
[Route("api/category")]
public class CategoryController : ControllerBase
{
    private readonly ICategoryService _service;

    public CategoryController(ICategoryService service)
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

    [HttpGet("category/{categoryId}")]
    public async Task<IActionResult> ByCategory(uint categoryId)
    {
        return Ok(await _service.GetByIdAsync(categoryId));
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string q)
        => Ok(await _service.SearchAsync(q));

    [HttpPost]
    public async Task<IActionResult> Create(Category category)
    {
        var id = await _service.CreateAsync(category);
        return CreatedAtAction(nameof(Get), new { id }, category);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(uint id, Category category)
    {
        category.CategoryId = id;
        return await _service.UpdateAsync(category) ? Ok() : NotFound();
    }



    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(uint id)
        => await _service.DeleteAsync(id) ? Ok() : NotFound();

   
}
