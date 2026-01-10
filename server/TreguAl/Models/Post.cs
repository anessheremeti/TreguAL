namespace HelloWorld.Models;

public class Post
{
    public uint PostId { get; set; }
    public uint UserId { get; set; }
    public uint CategoryId { get; set; }

    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public string PhoneNumber { get; set; } = null!;

    public string Status { get; set; } = "active";

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    // Shto këtë te Models/Post.cs
    public List<PostImage> Images { get; set; } = new List<PostImage>();
}
