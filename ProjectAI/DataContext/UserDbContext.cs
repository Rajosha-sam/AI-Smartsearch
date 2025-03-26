using System.Data;
using Domain.MODEL;
using Microsoft.EntityFrameworkCore;
using Rule = Domain.MODEL.Rule;


namespace ProjectAI.DataContext
{
    public class UserDbContext:DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext>option):base(option)
        {
            
        }
        public DbSet<Authorize> authorize { get; set; }
        public DbSet<User> user { get; set; }

        public DbSet<Rule> rule{ get; set; }
        //public DbSet<Chatbox> chatbox { get; set; }
        


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Authorize>().HasData(new Authorize { Id = 1, Name = "Admin" },
                                                  new Authorize { Id = 2, Name = "Priviledged User" },
                                                  new Authorize { Id = 3, Name = "Report Viewer" }
   );
        }

    }

}

