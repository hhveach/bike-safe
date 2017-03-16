using Application.Web.Data;
using Application.Web.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Web.Controllers
{
    public class FeaturesController : Controller
    {
        private UserManager<User> _UserManager { get; set; }
        private BikesContext _Context { get; set; }

        public FeaturesController(UserManager<User> userManager, BikesContext context)
        {
            _UserManager = userManager;
            _Context = context;
        }

        [HttpGet("~/api/features")]
        public IActionResult GetWindow(double upperLatitude, double upperLongitude, double lowerLatitude, double lowerLongitude)
        {
            var features = _Context.Features.Where(q => q.Latitude <= upperLatitude && q.Latitude >= lowerLatitude && q.Longitude <= upperLongitude && q.Longitude >= lowerLongitude);

            return Ok(features);
        }

        [HttpGet("~/api/features")]
        public IActionResult GetAll(int page = 1, int size = 50)
        {
            int index = (page - 1) * size;
            var features = _Context.Features.OrderBy(q => q.Id).Skip(index).Take(size);

            return Ok(features);
        }

        [HttpGet("~/api/features/{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_Context.Features.Find(id));
        }

        [HttpPost("~/api/consumer/features")]
        public async Task<IActionResult> ConsumerPost([FromBody]Feature feature)
        {
            var user = await _UserManager.GetUserAsync(User);

            var permission = new Permission();

            permission.Delete = true;
            permission.Grant = true;
            permission.Read = true;
            permission.Write = true;
            permission.Type = Permissions.Feature;
            permission.User = user;

            feature.Signature = permission.Signature = Guid.NewGuid();

            _Context.Permissions.Add(permission);
            _Context.Features.Add(feature);

            _Context.SaveChanges();

            return Ok(feature);
        }

        [HttpPut("~/api/consumer/features/{id}")]
        public IActionResult ConsumerPut(int id, [FromBody]Feature feature)
        {
            var userId = _UserManager.GetUserId(User);

            var existingFeature = _Context.Features.Find(id);

            if (existingFeature == null)
            {
                return NotFound();
            }

            var permission = _Context.Permissions
                .FirstOrDefault(q => q.Signature == existingFeature.Signature && q.User.Id == userId && q.Write == true);

            if (permission == null)
            {
                return Unauthorized();
            }

            existingFeature.Latitude = feature.Latitude;
            existingFeature.Longitude = feature.Longitude;
            existingFeature.Type = feature.Type;

            _Context.SaveChanges();

            return Ok(existingFeature);
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpDelete("~/api/admin/features/{id}")]
        public IActionResult ConsumerDelete(int id)
        {
            var userId = _UserManager.GetUserId(User);

            var existingFeature = _Context.Features.Find(id);

            if (existingFeature == null)
            {
                return NotFound();
            }

            var permission = _Context.Permissions
                .FirstOrDefault(q => q.Signature == existingFeature.Signature && q.Delete == true && q.User.Id == userId);

            if (permission == null)
            {
                return Unauthorized();
            }

            _Context.Features.Remove(existingFeature);

            _Context.SaveChanges();

            return Ok(existingFeature);
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpPut("~/api/admin/features/{id}")]
        public IActionResult AdminPut(int id, [FromBody]Feature feature)
        {
            var userId = _UserManager.GetUserId(User);

            var existingFeature = _Context.Features.Find(id);

            if (existingFeature == null)
            {
                return NotFound();
            }

            existingFeature.Latitude = feature.Latitude;
            existingFeature.Longitude = feature.Longitude;
            existingFeature.Type = feature.Type;

            _Context.SaveChanges();

            return Ok(existingFeature);
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpDelete("~/api/admin/features/{id}")]
        public IActionResult AdminDelete(int id)
        {
            var userId = _UserManager.GetUserId(User);

            var existingFeature = _Context.Features.Find(id);

            if (existingFeature == null)
            {
                return NotFound();
            }

            var permission = _Context.Permissions
                .FirstOrDefault(q => q.Signature == existingFeature.Signature && q.Delete == true && q.User.Id == userId);

            if (permission == null)
            {
                return Unauthorized();
            }

            _Context.Features.Remove(existingFeature);

            _Context.SaveChanges();

            return Ok(existingFeature);
        }
    }
}
