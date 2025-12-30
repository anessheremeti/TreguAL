namespace HelloWorld.DTOs
{
    public class DashboardSummaryDto
    {
        public int TotalUsers { get; set; }
        public int ActivePosts { get; set; }
        public int PendingAds { get; set; }
        public required string TotalPayments { get; set; } // E mbajmë string për të dërguar "400€"
    }
}