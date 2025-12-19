namespace HelloWorld.Models;

public class PostImage
{
    public uint PostImageId { get; set; }
    public uint PostId { get; set; }
    public string ImageUrl { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
}
