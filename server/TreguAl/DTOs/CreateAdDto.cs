using Microsoft.AspNetCore.Http;

public class CreateAdDto
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public IFormFile? Image { get; set; }
}
