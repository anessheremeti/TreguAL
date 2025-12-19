using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("users")]
    public class User
    {
        [Key]
        [Column("user_id")]
        public uint UserId { get; set; }

        [Required]
        [Column("role_id")]
        public uint RoleId { get; set; }

        [Required, MaxLength(150)]
        [Column("full_name")]
        public string FullName { get; set; } = null!;

        [MaxLength(200)]
        [Column("business_name")]
        public string? BusinessName { get; set; }

        [MaxLength(50)]
        [Column("business_id_number")]
        public string? BusinessIdNumber { get; set; }

        [Required, MaxLength(255)]
        [Column("email")]
        public string Email { get; set; } = null!; 

        [Required, MaxLength(255)]
        [Column("password_hash")]
        public string PasswordHash { get; set; } = null!;

        [Required, MaxLength(30)]
        [Column("phone_number")]
        public string PhoneNumber { get; set; } = null!;

        [Column("email_verified")]
        public bool EmailVerified { get; set; }

        [Column("phone_verified")]
        public bool PhoneVerified { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; }
    }
}
