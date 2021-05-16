using JewelryStore.Api.Controllers;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;
using Xunit;

namespace JeweleryStore.Test
{
    public class UnitTest
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<IdentityUser> _userManager;

        public UnitTest(UserManager<IdentityUser> userManager,
           SignInManager<IdentityUser> signInManager,
           RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }

        [Fact]
        public async Task SuccessLogin()
        {
            AccountController account = new AccountController(_userManager, _signInManager, _roleManager);
            var result = await account.Login(new JewelryStore.Api.ViewModel.LoginViewModel() { Password = "Welcome", UserName = "RegularUser" });

            Assert.NotNull(result);
        }
    }
}
