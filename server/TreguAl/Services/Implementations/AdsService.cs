using Dapper;
using HelloWorld.Models;
using HelloWorld.Services.Interfaces;
using MySqlConnector;
using System.Text.RegularExpressions;

namespace HelloWorld.Services.Implementations
{
    public class AdsService : IAdsService
    {
        private readonly IConfiguration _config;
        private readonly string _cs;

        public AdsService(IConfiguration config)
        {
            _config = config;
            _cs = config.GetConnectionString("DefaultConnection")!;
        }

        private MySqlConnection Conn() => new(_cs);

        public async Task<int> CreateAsync(uint userId, string? title, string? description, IFormFile image)
        {
            if (image == null || image.Length == 0)
                throw new Exception("Foto mungon.");

            if (!image.ContentType.StartsWith("image/"))
                throw new Exception("File duhet me qenë image.");

            // (opsionale) limit size p.sh. 20MB
            if (image.Length > 20_000_000)
                throw new Exception("Foto është shumë e madhe (max 20MB).");

            var adsFolder = _config["Cdn:AdsFolder"] ?? "wwwroot/ads";
            var cdnBase = (_config["Cdn:BaseUrl"] ?? "").TrimEnd('/');

            var slug = Slugify(title ?? "ad");
            var ext = Path.GetExtension(image.FileName);
            if (string.IsNullOrWhiteSpace(ext)) ext = ".jpg";

            // whitelist i thjeshtë i extension
            ext = ext.ToLowerInvariant();
            var allowed = new HashSet<string> { ".jpg", ".jpeg", ".png", ".webp" };
            if (!allowed.Contains(ext)) ext = ".jpg";

            var fileName = $"{Guid.NewGuid():N}{ext}";

            var physicalDir = Path.Combine(Directory.GetCurrentDirectory(), adsFolder, slug);
            Directory.CreateDirectory(physicalDir);

            var physicalPath = Path.Combine(physicalDir, fileName);
            await using (var fs = new FileStream(physicalPath, FileMode.Create))
                await image.CopyToAsync(fs);

            // URL që ruhet në DB
            // nëse s’ke CDN, ruaj relative (/ads/...)
            var imageUrl = string.IsNullOrWhiteSpace(cdnBase)
                ? $"/ads/{slug}/{fileName}"
                : $"{cdnBase}/ads/{slug}/{fileName}";

            const string sql = @"
                INSERT INTO ads (user_id, image_url, title, description, status)
                VALUES (@userId, @imageUrl, @title, @description, 'pending');
                SELECT LAST_INSERT_ID();
            ";

            using var db = Conn();
            var id = await db.ExecuteScalarAsync<int>(sql, new
            {
                userId,
                imageUrl,
                title,
                description
            });

            return id;
        }

        public async Task<bool> DeleteAsync(uint adId, uint userId)
        {
            using var db = Conn();

            const string getSql = @"
                SELECT image_url
                FROM ads
                WHERE ad_id=@adId AND user_id=@userId
                LIMIT 1
            ";

            var imageUrl = await db.ExecuteScalarAsync<string?>(
                getSql, new { adId, userId });

            const string delSql = @"
                DELETE FROM ads
                WHERE ad_id=@adId AND user_id=@userId
            ";

            var rows = await db.ExecuteAsync(delSql, new { adId, userId });

            if (rows > 0 && !string.IsNullOrWhiteSpace(imageUrl))
                TryDeleteFileFromUrl(imageUrl);

            return rows > 0;
        }

        public async Task<List<AdDto>> GetAllAsync()
        {
            const string sql = @"
                SELECT
                    ad_id      AS AdId,
                    user_id    AS UserId,
                    title      AS Title,
                    image_url  AS ImageUrl,
                    status     AS Status,
                    created_at AS CreatedAt
                FROM ads
                ORDER BY created_at DESC
            ";

            using var db = Conn();
            var list = await db.QueryAsync<AdDto>(sql);
            return list.ToList();
        }

        private static string Slugify(string input)
        {
            input = input.Trim().ToLowerInvariant();
            input = Regex.Replace(input, @"[^a-z0-9\s-]", "");
            input = Regex.Replace(input, @"\s+", "-").Trim('-');
            input = Regex.Replace(input, @"-+", "-");
            return string.IsNullOrWhiteSpace(input) ? "ad" : input;
        }

        private void TryDeleteFileFromUrl(string url)
        {
            try
            {
                var adsFolder = _config["Cdn:AdsFolder"] ?? "wwwroot/ads";

                // pranon edhe absolute edhe relative
                var path = url;
                if (Uri.TryCreate(url, UriKind.Absolute, out var u))
                    path = u.AbsolutePath;

                // "/ads/slug/file.jpg"
                var parts = path.Trim('/').Split('/');
                if (parts.Length < 3) return;

                var slug = parts[1];
                var file = parts[2];

                var physical = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    adsFolder,
                    slug,
                    file
                );

                if (File.Exists(physical))
                    File.Delete(physical);
            }
            catch { }
        }
    }
}
