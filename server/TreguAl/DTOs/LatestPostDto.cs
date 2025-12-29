namespace HelloWorld.DTOs
{
    public class LatestPostDto
    {
        public int PostId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
    }
}