namespace HelloWorld.DTOs;

public class AdminPostDisplayDto
{
    public int PostId { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string OwnerName { get; set; } = "";
    public string CategoryName { get; set; } = "";
    public string PostStatus { get; set; } = "";
    public DateTime DateCreated { get; set; }
    public List<string> ImageUrls { get; set; } = new();
}