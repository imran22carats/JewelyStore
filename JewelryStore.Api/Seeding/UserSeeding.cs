using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JewelryStore.Api.Seeding
{
    public static class UserSeeding
    {
        public static void CreateUserRoles(IServiceProvider serviceProvider, IConfiguration configuration)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<IdentityUser>>();
            string[] roles = { "Regular", "Privileged" };
            var regularuser = new IdentityUser
            {
                UserName = "ReglarUser",
                Email = "ReglarUser@JS.in",
                EmailConfirmed = true,
            };

            var privallageduser = new IdentityUser
            {
                UserName = "PrivilegeUser",
                Email = "PrivilegeUser@JS.in",
                EmailConfirmed = true,
            };

            foreach (var roleName in roles)
            {
                if (!roleManager.RoleExistsAsync(roleName).GetAwaiter().GetResult())
                    roleManager.CreateAsync(new IdentityRole(roleName)).GetAwaiter().GetResult();
            }

            if (userManager.FindByEmailAsync(regularuser.Email).Result == null)
            {
                var result = userManager.CreateAsync(regularuser, "Welcome").GetAwaiter().GetResult();
                if (result.Succeeded)
                    userManager.AddToRoleAsync(regularuser, "Regular").GetAwaiter().GetResult();
            }

            if (userManager.FindByEmailAsync(privallageduser.Email).Result == null)
            {
                var result = userManager.CreateAsync(privallageduser, "Welcome").GetAwaiter().GetResult();
                if (result.Succeeded)
                    userManager.AddToRoleAsync(privallageduser, "Privileged").GetAwaiter().GetResult();
            }
        }
    }
}
