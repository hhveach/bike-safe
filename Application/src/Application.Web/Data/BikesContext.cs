using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Application.Web.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Web.Data
{
    public class BikesContext : IdentityDbContext<User>
    {
        public DbSet<Ride> Rides { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<Hazard> Hazards { get; set; }
        public DbSet<Feature> Features { get; set; }

        public BikesContext(DbContextOptions<BikesContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
                .ToTable("Users");
            builder.Entity<IdentityRole>()
                .ToTable("Roles");
            builder.Entity<IdentityRoleClaim<string>>()
                .ToTable("RoleClaims");
            builder.Entity<IdentityUserClaim<string>>()
                .ToTable("UserClaims");
            builder.Entity<IdentityUserLogin<string>>()
                .ToTable("UserLogins");
            builder.Entity<IdentityUserRole<string>>()
                .ToTable("UserRoles");
            builder.Entity<IdentityUserToken<string>>()
                .ToTable("UserTokens");
        }
    }
}
