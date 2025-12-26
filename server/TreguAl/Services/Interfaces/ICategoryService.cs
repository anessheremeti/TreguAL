using Domain.Entities;
using HelloWorld.Models;

namespace HelloWorld.Interfaces;

public interface ICategoryService
{
    Task<IEnumerable<Category>> GetAllAsync();
    Task<Category?> GetByIdAsync(uint categoryId);
    Task<IEnumerable<Category>> SearchAsync(string query);

    Task<uint> CreateAsync(Category category);
    Task<bool> UpdateAsync(Category category);
    Task<bool> DeleteAsync(uint categoryId);
  
}
