using Microsoft.EntityFrameworkCore;
using Microsoft.Data.Sqlite;

using API.Entities;
namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<AppUser> Users { get; set; }

    }
}