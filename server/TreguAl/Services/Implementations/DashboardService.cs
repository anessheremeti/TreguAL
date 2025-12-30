using HelloWorld.DTOs;
using HelloWorld.Services.Interfaces;
using HelloWorld.Data;

namespace HelloWorld.Services.Implementations
{
    public class DashboardService : IDashboardService
    {
        private readonly DataDapper _dapper;

        public DashboardService(DataDapper dapper)
        {
            _dapper = dapper;
        }

        public async Task<DashboardSummaryDto> GetStatsAsync()
        {
            string sqlUsers = "SELECT COUNT(*) FROM users";
            string sqlPosts = "SELECT COUNT(*) FROM posts WHERE status = 'active'";
            string sqlAds = "SELECT COUNT(*) FROM ads WHERE status = 'pending'";
            string sqlPayments = "SELECT SUM(amount) FROM payments WHERE status = 'paid'";

            // Përdorim metodën ExecuteScalarAsync që ekziston në DataDapper.cs
            var totalUsers = await _dapper.ExecuteScalarAsync<int>(sqlUsers);
            var activePosts = await _dapper.ExecuteScalarAsync<int>(sqlPosts);
            var pendingAds = await _dapper.ExecuteScalarAsync<int>(sqlAds);

            // Për shumën, përdorim decimal pasi shuma mund të jetë me presje
            var totalAmount = await _dapper.ExecuteScalarAsync<decimal>(sqlPayments);

            return new DashboardSummaryDto
            {
                TotalUsers = totalUsers,
                ActivePosts = activePosts,
                PendingAds = pendingAds,
                TotalPayments = $"{totalAmount}€"
            };
        }
    }
}