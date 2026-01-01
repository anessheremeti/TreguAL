namespace HelloWorld.DTOs
{
    public class MemberSummaryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public bool IsVerified { get; set; }
        public DateTime CreatedAt { get; set; }
        public int TotalPosts { get; set; }
        public int TotalAds { get; set; }
        public int TotalReviews { get; set; }
    }
}