using Application.Web.Data;
using Application.Web.Data.Entities;
using Application.Web.Models.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Web.Controllers
{
    [Authorize]
    public class ProfilesController : Controller
    {
        private BikesContext _Context { get; set; }
        private UserManager<User> _UserManager { get; set; }
        private IHostingEnvironment _Environment { get; set; }
        public ProfilesController(IHostingEnvironment environment, BikesContext bikesContext, UserManager<User> userManager)
        {
            _Environment = environment;
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

        [HttpPut("~/api/profiles")]
        public IActionResult Post([FromBody]ProfileRequest model)
        {
            var userId = _UserManager.GetUserId(User);
            var user = _Context.Users.Include(q => q.Bike).FirstOrDefault(q => q.Id == userId);

            user.Bike = model.Bike;
            user.Name = model.Name;

            _Context.SaveChanges();

            return Ok(model);
        }

        [HttpPost("~/api/profiles/image")]
        public async Task<IActionResult> Image(IFormFile image)
        {
            var user = await _UserManager.GetUserAsync(User);

            var profilesPath = Path.Combine(_Environment.WebRootPath, "images", "profiles");

            var extension = Path.GetExtension(image.FileName);
            var name = Guid.NewGuid().ToString();
            var path = Path.Combine(profilesPath, $"{name}{extension}");

            using (var stream = System.IO.File.Create(path))
            {
                image.CopyTo(stream);
                stream.Flush();
            }

            var fileName = Path.GetFileName(user.Image);
            var existingImage = Path.Combine(profilesPath, fileName);
            if (System.IO.File.Exists(existingImage))
            {
                System.IO.File.Delete(existingImage);
            }

            string url = $"/images/profiles/{name}{extension}";

            user.Image = url;


            var result = await _UserManager.UpdateAsync(user);

            return Ok(new { ImageUrl = url });
        }
    }
}
