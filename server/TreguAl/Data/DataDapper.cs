using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using MySqlConnector;
using Microsoft.Extensions.Configuration;

namespace HelloWorld.Data
{
    public class DataDapper
    {
        private readonly string _connectionString;

        public DataDapper(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DefaultConnection")
                ?? throw new InvalidOperationException("Missing DefaultConnection");
        }

        private MySqlConnection CreateConnection()
            => new MySqlConnection(_connectionString);

        public async Task<IEnumerable<T>> LoadDataAsync<T>(string sql, object? parameters = null)
        {
            using var connection = CreateConnection();
            return await connection.QueryAsync<T>(sql, parameters);
        }

        public async Task<T?> LoadSingleAsync<T>(string sql, object? parameters = null)
        {
            using var connection = CreateConnection();
            return await connection.QuerySingleOrDefaultAsync<T>(sql, parameters);
        }

        public async Task<int> ExecuteAsync(string sql, object? parameters = null)
        {
            using var connection = CreateConnection();
            return await connection.ExecuteAsync(sql, parameters);
        }

        public async Task<T?> ExecuteScalarAsync<T>(string sql, object? parameters = null)
        {
            using var connection = CreateConnection();
            var result = await connection.ExecuteScalarAsync(sql, parameters);
            return result == null || result is DBNull
                ? default
                : (T)Convert.ChangeType(result, typeof(T));
        }

       public async Task ExecuteSqlAsync(string sql, object? parameters = null)
{
    using var connection = CreateConnection();
    await connection.ExecuteAsync(sql, parameters);
}

    }
}
