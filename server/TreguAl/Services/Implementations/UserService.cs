using Application.DTOs;
using Application.Interfaces;
using Domain.Entities;
using HelloWorld.Data;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;


namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly DataDapper _db;

        public UserService(DataDapper db)
        {
            _db = db;
        }
    public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
{
    const string sql = @"
        SELECT user_id AS UserId,
               role_id AS RoleId,
               full_name AS FullName,
               email AS Email,
               password_hash AS PasswordHash
        FROM users
        WHERE email = @Email
        LIMIT 1;
    ";

    var user = await _db.LoadSingleAsync<LoginUserRow>(sql, new { Email = dto.Email });

    if (user == null)
        throw new Exception("Email ose password gabim");

    var incomingHash = HashPassword(dto.Password); // SHA256 si create
    if (incomingHash != user.PasswordHash)
        throw new Exception("Email ose password gabim");

    var token = GenerateJwtToken(user.UserId, user.RoleId, user.Email);

    return new AuthResponseDto
    {
        Token = token,
        UserId = user.UserId,
        RoleId = user.RoleId,
        FullName = user.FullName,
        Email = user.Email
    };
}

private sealed class LoginUserRow
{
    public uint UserId { get; set; }
    public uint RoleId { get; set; }
    public string FullName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string PasswordHash { get; set; } = null!;
}

private string GenerateJwtToken(uint userId, uint roleId, string email)
{
    // ✅ OPSIONI 2: lexon config pa DI
    var config = new ConfigurationBuilder()
        .SetBasePath(AppContext.BaseDirectory)
        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
        .AddJsonFile("appsettings.Development.json", optional: true, reloadOnChange: true)
        .AddEnvironmentVariables()
        .Build();

    var key = config["Jwt:Key"];
    var issuer = config["Jwt:Issuer"];
    var audience = config["Jwt:Audience"];

    if (string.IsNullOrWhiteSpace(key))
        throw new Exception("Jwt:Key mungon ne appsettings.json");

    var claims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
        new Claim(ClaimTypes.Role, roleId.ToString()),
        new Claim("role_id", roleId.ToString()),
        new Claim(JwtRegisteredClaimNames.Email, email),
    };

    var securityKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(key));
    var creds = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

    var token = new JwtSecurityToken(
        issuer: issuer,
        audience: audience,
        claims: claims,
        expires: DateTime.UtcNow.AddDays(1),
        signingCredentials: creds
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
}

        public async Task<UserDto> CreateAsync(CreateUserDto dto)
        {
            const string checkSql = "SELECT COUNT(1) FROM users WHERE email = @Email";

            var exists = await _db.ExecuteScalarAsync<int>(checkSql, new { dto.Email });

            if (exists > 0)
                throw new Exception("Email already exists");

            const string insertSql = @"
                INSERT INTO users
                (role_id, full_name, email, password_hash, phone_number)
                VALUES
                (@RoleId, @FullName, @Email, @PasswordHash, @PhoneNumber);
                SELECT LAST_INSERT_ID();
            ";

            var userId = await _db.ExecuteScalarAsync<uint>(insertSql, new
            {
                dto.RoleId,
                dto.FullName,
                dto.Email,
                PasswordHash = HashPassword(dto.Password),
                dto.PhoneNumber
            });

            return new UserDto
            {
                UserId = userId,
                FullName = dto.FullName,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber
            };
        }

        private static string HashPassword(string password)
        {
            using var sha = SHA256.Create();
            return Convert.ToBase64String(
                sha.ComputeHash(Encoding.UTF8.GetBytes(password))
            );
        }

        public async Task<UserDto?> GetByIdAsync(uint userId)
        {
            const string sql = @"
                SELECT user_id AS UserId,
                       full_name AS FullName,
                       email AS Email,
                       phone_number AS PhoneNumber,
                       email_verified AS EmailVerified,
                       phone_verified AS PhoneVerified
                FROM users
                WHERE user_id = @UserId
            ";

            return await _db.LoadSingleAsync<UserDto>(sql, new { UserId = userId });
        }

        public async Task<IEnumerable<UserDto>> GetAllAsync()
        {
            const string sql = @"
                SELECT user_id AS UserId,
                       full_name AS FullName,
                       email AS Email,
                       phone_number AS PhoneNumber,
                       email_verified AS EmailVerified,
                       phone_verified AS PhoneVerified
                FROM users
            ";

            return await _db.LoadDataAsync<UserDto>(sql);
        }

         
            public async Task<UserDto> UpdateUserAsync(int id, User users)
            {
                try
                {
                    var sql = @"
                        UPDATE users
                        SET full_name = @FullName,
                            email = @Email,
                            phone_number = @PhoneNumber,
                            email_verified = @EmailVerified,
                            phone_verified = @PhoneVerified
                        WHERE user_id = @UserId;
                    ";
    
                    var parameters = new
                    {
                        UserId = id,
                        users.FullName,
                        users.Email,
                        users.PhoneNumber,
                        users.EmailVerified,
                        users.PhoneVerified
                    };
    
                    await _db.ExecuteSqlAsync(sql, parameters);
    
                    return new UserDto
                    {
                        UserId = (uint)id,
                        FullName = users.FullName,
                        Email = users.Email,
                        PhoneNumber = users.PhoneNumber,
                        EmailVerified = users.EmailVerified,
                        PhoneVerified = users.PhoneVerified
                    };
                }
                catch (Exception ex)
                {
                    throw new Exception($"Error while updating user with ID {id}: {ex.Message}", ex);
                }
            }

        public async Task<bool> DeleteUserAsync(int id)
        {
            try
            {
                var sql = "DELETE FROM users WHERE user_id = @UserId;";
                var parameters = new { UserId = id };
                await _db.ExecuteSqlAsync(sql, parameters);
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error while deleting user with ID {id}: {ex.Message}", ex);
            }
        }
}

}
