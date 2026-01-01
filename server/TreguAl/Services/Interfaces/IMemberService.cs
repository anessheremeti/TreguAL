using HelloWorld.DTOs;

namespace HelloWorld.Services.Interfaces
{
    public interface IMemberService
    {
        Task<IEnumerable<MemberSummaryDto>> GetAllMembersAsync();
    }
}