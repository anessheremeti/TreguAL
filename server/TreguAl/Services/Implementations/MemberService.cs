using HelloWorld.DTOs;
using HelloWorld.Services.Interfaces;
using HelloWorld.Data; // Importo namespace-in ku ndodhet DataDapper

namespace HelloWorld.Services.Implementations
{
    public class MemberService : IMemberService
    {
        private readonly DataDapper _dapper;

        public MemberService(DataDapper dapper)
        {
            _dapper = dapper;
        }

        public async Task<IEnumerable<MemberSummaryDto>> GetAllMembersAsync()
        {
            string sql = @"
                SELECT 
                    u.user_id as Id, 
                    u.full_name as Name, 
                    r.role_name as Role, 
                    u.email as Email, 
                    u.phone_number as Phone, 
                    u.email_verified as IsVerified, 
                    u.created_at as CreatedAt,
                    (SELECT COUNT(*) FROM posts WHERE user_id = u.user_id) as TotalPosts,
                    (SELECT COUNT(*) FROM ads WHERE user_id = u.user_id) as TotalAds,
                    (SELECT COUNT(*) FROM reviews WHERE reviewed_user_id = u.user_id) as TotalReviews
                FROM users u
                JOIN roles r ON u.role_id = r.role_id";

            // Përdorim LoadDataAsync nga klasa jote DataDapper
            return await _dapper.LoadDataAsync<MemberSummaryDto>(sql);
        }
    }
}