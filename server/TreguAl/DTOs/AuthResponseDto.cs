namespace Application.DTOs
{
    public class AuthResponseDto
    {
        public string Token { get; set; } = null!;
        public uint UserId { get; set; }
        public uint RoleId { get; set; }
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
    }
}
