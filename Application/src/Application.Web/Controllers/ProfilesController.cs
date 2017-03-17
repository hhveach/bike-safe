using Application.Web.Data;
using Application.Web.Data.Entities;
using Application.Web.Models.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Web.Controllers
{
    [Authorize]
    public class ProfilesController : Controller
    {
        private BikesContext _Context { get; set; }
        private UserManager<User> _UserManager { get; set; }

        public ProfilesController(BikesContext bikesContext, UserManager<User> userManager)
        {
            _Context = bikesContext;
            _UserManager = userManager;
        }

        [HttpGet("~/api/profiles")]
        public async Task<IActionResult> Get()
        {
            var user = await _UserManager.GetUserAsync(User);

            var profile = new
            {
                Name = user.Name,
                Bike = user.Bike
            };

            return Ok(profile);
        }

        [HttpPost("~/api/profiles")]
        public IActionResult Post([FromBody]ProfileRequest model)
        {
            var userId = _UserManager.GetUserId(User);
            var user = _Context.Users.Include(q => q.Bike).FirstOrDefault(q => q.Id == userId);

            user.Bike = model.Bike;
            user.Name = model.Name;

            _Context.SaveChanges();

            return Ok(model);
        }
    }
}
