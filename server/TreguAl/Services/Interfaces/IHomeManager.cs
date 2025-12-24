using HelloWorld.DTOs;

namespace HelloWorld.Services.Interfaces
{
    public interface IHomeManager
    {
        Task<IEnumerable<DisplayProduct>> GetTopThreeProducts();
    }
}