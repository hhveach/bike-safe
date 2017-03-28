using Application.Web.Data;
using Application.Web.Data.Entities;
using Application.Web.Models.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Web.Controllers
{
    public class AccountsController : Controller
    {
        private SignInManager<User> _SignInManager { get; set; }
        private UserManager<User> _UserManager { get; set; }

        public AccountsController(SignInManager<User> signInManager, UserManager<User> userManager)
        {
            _SignInManager = signInManager;
            _UserManager = userManager;
        }

        [HttpPost("~/api/accounts/login")]
        public async Task<IActionResult> Login([FromBody]LoginRequest model)
        {
            var user = await _UserManager.FindByEmailAsync(model.Email);

            if(user == null)
            {
                return BadRequest(new { IsAuthenticated = false, Message = "Invalid Email or Password" });
            }
            else
            {
                var result = await _SignInManager.PasswordSignInAsync(user, model.Password, model.RememberMe, true);

                if(result.Succeeded)
                {
                    return Ok(new { IsAuthenticated = true, Email = model.Email });
                }
                else if(result.IsLockedOut)
                {
                    return BadRequest(new { IsAuthenticated = false, Message = "Locked out" });
                }
                else if(result.IsNotAllowed)
                {
                    return BadRequest(new { IsAuthenticated = false, Message = "Is not allowed" });
                }
                else
                {
                    return BadRequest(new { IsAuthenticated = false, Message = "Invalid Email or Password" });
                }
            }
        }

        [HttpPost("~/api/accounts/register")]
        public async Task<IActionResult> Register([FromBody]RegisterRequest model)
        {
            var user = new User();
            user.Email = model.Email;
            user.UserName = user.Name = model.Name;

            var result = await _UserManager.CreateAsync(user, model.Password);

            if(result.Succeeded)
            {
                return Ok(new { IsAuthenticated = true, Email = model.Email });
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }

        [HttpPost("~/api/accounts/logout")]
        public async Task<IActionResult> Logout()
        {
            await _SignInManager.SignOutAsync();
            return Ok();
        }

        [HttpGet("~/api/accounts")]
        public async Task<IActionResult> Get()
        {
            if(User.Identity.IsAuthenticated)
            {
                var user = await _UserManager.GetUserAsync(User);
                var output = new
                {
                    IsAuthenticated = User.Identity.IsAuthenticated,
                    Email = User.Identity.Name,
                    Name = user.Name,
                    Image = user.Image,
                    Bike = user.Bike
                };

                return Ok(output);
            }
            else
            {
                return Ok(new { IsAuthenticated = User.Identity.IsAuthenticated });
            }
        }
    }
}
