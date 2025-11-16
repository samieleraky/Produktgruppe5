using Microsoft.EntityFrameworkCore;
using dotlegalBackend.Models; 

namespace dotlegalBackend.Data
{
    public class ApplicationDbContext : DbContext  // Database context class for Entity Framework Core
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> opts) : base(opts) { }
        public DbSet<Application> Applications { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
