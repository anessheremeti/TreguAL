public class AdDto
{
    public uint AdId { get; set; }
    public uint UserId { get; set; }
    public string? Title { get; set; }
    public string ImageUrl { get; set; } = "";
    public string Status { get; set; } = "pending";
    public DateTime CreatedAt { get; set; }
}
