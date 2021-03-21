using ChessComboCMS.Domain;
using Microsoft.EntityFrameworkCore;

namespace ChessComboCMS.Data
{
    public class ChessComboCMSContext : DbContext
    {
        public ChessComboCMSContext(DbContextOptions<ChessComboCMSContext> options) : base(options)
        {
        }

        public DbSet<Game> Games { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<Combination> Combinations { get; set; }
    }
}
