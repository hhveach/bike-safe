using Application.Web.Data;
using Application.Web.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace Application.Web.Controllers
{
    [Authorize]
    public class RidesController : Controller
    {
        private UserManager<User> _UserManager { get; set; }
        private BikesContext _Context { get; set; }

        public RidesController(UserManager<User> userManager, BikesContext context)
        {
            _UserManager = userManager;
            _Context = context;
        }

        [HttpGet("~/api/rides")]
        public IActionResult GetAll()
        {
            var userId = _UserManager.GetUserId(User);
            var permissions = _Context.Permissions.Where(q => q.User.Id == userId);
            var rides = _Context.Rides.Where(q => permissions.Any(r => r.Signature == q.Signature)).ToList();

            return Ok(rides);
        }

        [HttpGet("~/api/rides/{id}")]
        public IActionResult Get(int id)
        {
            var ride = _Context.Rides.Find(id);
            
            if(ride == null)
            {
                return NotFound();
            }

            var hasPermissions = HasPermission(ride.Signature);
            if(!hasPermissions)
            {
                return Unauthorized();
            }

            return Ok(ride);
        }

        [HttpPost("~/api/consumer/rides")]
        public async Task<IActionResult> ConsumerPost([FromBody]Ride ride)
        {
            var user = await _UserManager.GetUserAsync(User);

            var permission = new Permission();
            permission.Delete = true;
            permission.Grant = true;
            permission.Read = true;
            permission.Write = true;

            permission.Type = Permissions.Ride;
            permission.User = user;
            ride.Signature = permission.Signature = Guid.NewGuid();

            _Context.Rides.Add(ride);

            _Context.SaveChanges();

            return Ok(ride);
        }

        [HttpPut("~/api/consumer/rides/{id}")]
        public IActionResult ConsumerPut(int id, [FromBody]Ride ride)
        {
            var existingRide = _Context.Rides.Find(id);
            
            if(existingRide == null)
            {
                return NotFound();
            }

            if(!HasPermission(existingRide.Signature))
            {
                return Unauthorized();
            }

            existingRide.Destination = ride.Destination;
            existingRide.Source = ride.Source;
            
            return Ok(existingRide);
        }

        [HttpDelete("~/api/consumer/rides/{id}")]
        public IActionResult ConsumerDelete(int id)
        {
            var existingRide = _Context.Rides.Find(id);

            if(existingRide == null)
            {
                return NotFound();
            }

            if(!HasPermission(existingRide.Signature))
            {
                return Unauthorized();
            }

            _Context.Rides.Remove(existingRide);
            _Context.SaveChanges();

            return Ok(existingRide);
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpPut("~/api/admin/rides/{id}")]
        public IActionResult AdminPut(int id, [FromBody]Ride ride)
        {
            var existingRide = _Context.Rides.Find(id);

            if (existingRide == null)
            {
                return NotFound();
            }
            existingRide.Name = ride.Name;
            existingRide.Destination = ride.Destination;
            existingRide.Source = ride.Source;

            return Ok(existingRide);
        }


        [Authorize(Roles = Roles.Admin)]
        [HttpDelete("~/api/admin/rides/{id}")]
        public IActionResult AdminDelete(int id)
        {
            var existingRide = _Context.Rides.Find(id);

            if (existingRide == null)
            {
                return NotFound();
            }

            _Context.Rides.Remove(existingRide);
            _Context.SaveChanges();

            return Ok(existingRide);
        }

        private bool HasPermission(Guid signature)
        {
            var userId = _UserManager.GetUserId(User);

            return _Context.Permissions.Any(q => q.Signature == signature && q.User.Id == userId);
        }
    }
}
