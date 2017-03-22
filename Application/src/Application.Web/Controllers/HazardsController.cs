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
    public class HazardsController : Controller
    {
        private UserManager<User> _UserManager { get; set; }
        private BikesContext _Context { get; set; }

        public HazardsController(UserManager<User> userManager, BikesContext context)
        {
            _UserManager = userManager;
            _Context = context;
        }

        [HttpGet("~/api/consumer/hazards")]
        public IActionResult GetWindow(double upperLatitude, double upperLongitude, double lowerLatitude, double lowerLongitude)
        {
            var hazards = _Context.Hazards.Where(q => q.Latitude <= upperLatitude && q.Latitude >= lowerLatitude && q.Longitude <= upperLongitude && q.Longitude >= lowerLongitude);

            return Ok(hazards);
        }

        [HttpGet("~/api/admin/hazards")]
        public IActionResult GetAll(int page = 1, int size = 25)
        {
            var index = page - 1 * size;

            var hazards = _Context.Hazards.OrderBy(q => q.Id).Skip(index).Take(size);

            return Ok(hazards);
        }

        [HttpGet("~/api/hazards/{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_Context.Hazards.Find(id));
        }

        [HttpPost("~/api/consumer/hazards")]
        public async Task<IActionResult> ConsumerPost([FromBody]Hazard hazard)
        {
            var user = await _UserManager.GetUserAsync(User);

            var permission = new Permission();

            permission.Delete = true;
            permission.Grant = true;
            permission.Read = true;
            permission.Write = true;
            permission.Type = Permissions.Hazard;
            permission.User = user;

            hazard.Signature = permission.Signature = Guid.NewGuid();

            _Context.Permissions.Add(permission);
            _Context.Hazards.Add(hazard);

            _Context.SaveChanges();

            return Ok(hazard);
        }

        [HttpPut("~/api/consumer/hazards/{id}")]
        public IActionResult ConsumerPut(int id , [FromBody]Hazard hazard)
        {
            var userId = _UserManager.GetUserId(User);

            var existingHazard = _Context.Hazards.Find(id);

            if(existingHazard == null)
            {
                return NotFound();
            }

            var permission = _Context.Permissions
                .FirstOrDefault(q=>q.Signature == existingHazard.Signature && q.User.Id == userId && q.Write == true);

            if (permission == null)
            {
                return Unauthorized();
            }

            existingHazard.Latitude = hazard.Latitude;
            existingHazard.Longitude = hazard.Longitude;
            existingHazard.Type = hazard.Type;

            _Context.SaveChanges();

            return Ok(existingHazard);
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpDelete("~/api/consumer/hazards/{id}")]
        public IActionResult ConsumerDelete(int id)
        {
            var userId = _UserManager.GetUserId(User);

            var existingHazard = _Context.Hazards.Find(id);

            if (existingHazard == null)
            {
                return NotFound();
            }

            var permission = _Context.Permissions
                .FirstOrDefault(q => q.Signature == existingHazard.Signature && q.Delete == true && q.User.Id == userId);

            if(permission == null)
            {
                return Unauthorized();
            }

            _Context.Hazards.Remove(existingHazard);

            _Context.SaveChanges();

            return Ok(existingHazard);
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpPut("~/api/admin/hazards/{id}")]
        public IActionResult AdminPut(int id, [FromBody]Hazard hazard)
        {
            var userId = _UserManager.GetUserId(User);

            var existingHazard = _Context.Hazards.Find(id);

            if (existingHazard == null)
            {
                return NotFound();
            }

            existingHazard.Latitude = hazard.Latitude;
            existingHazard.Longitude = hazard.Longitude;
            existingHazard.Type = hazard.Type;

            _Context.SaveChanges();

            return Ok(existingHazard);
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpDelete("~/api/admin/hazards/{id}")]
        public IActionResult AdminDelete(int id)
        {
            var userId = _UserManager.GetUserId(User);

            var existingHazard = _Context.Hazards.Find(id);

            if (existingHazard == null)
            {
                return NotFound();
            }

            var permission = _Context.Permissions
                .FirstOrDefault(q => q.Signature == existingHazard.Signature && q.Delete == true && q.User.Id == userId);

            if (permission == null)
            {
                return Unauthorized();
            }

            _Context.Hazards.Remove(existingHazard);

            _Context.SaveChanges();

            return Ok(existingHazard);
        }
    }
}
