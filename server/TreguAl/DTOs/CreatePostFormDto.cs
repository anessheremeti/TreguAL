using Microsoft.AspNetCore.Http;

public class CreatePostFormDto
{
    public uint CategoryId { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public string PhoneNumber { get; set; } = null!;
    public List<IFormFile> Images { get; set; } = new();
}
