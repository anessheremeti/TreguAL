using Dapper;
using HelloWorld.Data;
using HelloWorld.DTOs;
using HelloWorld.Services.Interfaces;

namespace HelloWorld.Services.Implementations
{
    public class HomeManager : IHomeManager
    {
        private readonly DataDapper _dapper;
        public HomeManager(DataDapper dapper)
        {
            _dapper = dapper;
        }

        public async Task<IEnumerable<DisplayProduct>> GetTopThreeProducts()
        {
            string sql = @"
                SELECT p.post_id AS PostId, p.title, MIN(pi.image_url) AS ImageUrl
                FROM posts p
                LEFT JOIN post_images pi ON p.post_id = pi.post_id
                WHERE p.status = 'active'
                GROUP BY p.post_id
                LIMIT 3";

            return await _dapper.LoadDataAsync<DisplayProduct>(sql);
        }
    }
}