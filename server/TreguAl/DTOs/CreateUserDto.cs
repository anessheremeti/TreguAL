using System.ComponentModel.DataAnnotations;

namespace Application.DTOs
{
    public class CreateUserDto
    {
        [Required]
        public uint RoleId { get; set; }

        [Required, MaxLength(150)]
        public string FullName { get; set; } = null!;

        [MaxLength(200)]
        public string? BusinessName { get; set; }

        [MaxLength(50)]
        public string? BusinessIdNumber { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; } = null!;
        [Required, MinLength(8)]
        public string Password { get; set; } = null!;

        [Required]
        public string PhoneNumber { get; set; } = null!;
    }
}
