using Application.Web.Data;
using Application.Web.Data.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Web
{
    public static class DatabaseSeedInitalizer
    {
        public static async Task<IApplicationBuilder> UseSeedInitializer(this IApplicationBuilder builder)
        {
            var context = builder.ApplicationServices.GetRequiredService<BikesContext>();
            var roleManager = builder.ApplicationServices.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = builder.ApplicationServices.GetRequiredService<UserManager<User>>();

            context.Database.Migrate();

            if (!await roleManager.RoleExistsAsync(Roles.Admin))
            {
                await roleManager.CreateAsync(new IdentityRole(Roles.Admin));
            }

            if (!await roleManager.RoleExistsAsync(Roles.Consumer))
            {
                await roleManager.CreateAsync(new IdentityRole(Roles.Consumer));
            }

            if (await userManager.FindByEmailAsync("admin@bike-safe.com") == null)
            {
                var user = new User();
                user.UserName = user.Email = "admin@bike-safe.com";
                user.Name = "Dr. Jones";
                user.Bike = new Bike()
                {
                    Image = "https://trek.scene7.com/is/image/TrekBicycleProducts/1479000_2017_A_1_Emonda_SLR_9?wid=3000&hei=2454&fmt=jpg&qlt=50,1&op_usm=0,0,0,0&iccEmbed=0&cache=on,on",
                    Make = "Trek",
                    Model = "Emonda SLR 9"
                };

                var result = await userManager.CreateAsync(user, "qwer1234");
            }

            if (await userManager.FindByEmailAsync("consumer@bike-safe.com") == null)
            {
                var user = new User();
                user.UserName = user.Email = "consumer@bike-safe.com";
                user.Name = "Mr. Bigglesworth";
                user.Bike = new Bike()
                {
                    Image = "https://trek.scene7.com/is/image/TrekBicycleProducts/1479000_2017_A_1_Emonda_SLR_9?wid=3000&hei=2454&fmt=jpg&qlt=50,1&op_usm=0,0,0,0&iccEmbed=0&cache=on,on",
                    Make = "Trek",
                    Model = "Emonda SLR 9"
                };

                var result = await userManager.CreateAsync(user, "qwer1234");
            }

            return builder;
        }
    }
}
