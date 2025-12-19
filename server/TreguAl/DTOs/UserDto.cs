namespace Application.DTOs
{
    public class UserDto
    {
        public uint UserId { get; set; }
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public bool EmailVerified { get; set; }
        public bool PhoneVerified { get; set; }
    }
}
