using HelloWorld.DTOs;

namespace HelloWorld.Services.Interfaces
{
    public interface IDashboardService
    {
        Task<DashboardSummaryDto> GetStatsAsync();
    }
}