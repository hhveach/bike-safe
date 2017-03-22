using Application.Web.Data;
using Application.Web.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

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

        [HttpGet("~/api/consumer/rides")]
        public IActionResult GetAll(int page = 1, int size = 20)
        {
            var blah = User.IsInRole(Roles.Admin);
            var userId = _UserManager.GetUserId(User);

            int index = (Math.Max(1, page) - 1) * size;

            var permissions = _Context.Permissions
                .Where(q => q.User.Id == userId && q.Read == true && q.Type == Permissions.Ride)
                .Skip(index)
                .Take(size)
                .ToList();

            var rides = _Context.Rides.Where(q => permissions.Any(r => r.Signature == q.Signature)).ToList();

            return Ok(rides);
        }

        [HttpGet("~/api/consumer/rides/{id}")]
        public IActionResult Get(int id)
        {
            var userId = _UserManager.GetUserId(User);

            var existingRide = _Context.Rides.Find(id);

            if (existingRide == null)
            {
                return NotFound();
            }

            var permission = _Context.Permissions.FirstOrDefault(q => q.Read == true && q.Signature == existingRide.Signature && q.User.Id == userId);
            if (permission == null)
            {
                return Unauthorized();
            }

            return Ok(existingRide);
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
            _Context.Permissions.Add(permission);

            _Context.SaveChanges();

            return Ok(ride);
        }

        [HttpPut("~/api/consumer/rides/{id}")]
        public IActionResult ConsumerPut(int id, [FromBody]Ride ride)
        {
            var userId = _UserManager.GetUserId(User);

            var existingRide = _Context.Rides.Find(id);

            if (existingRide == null)
            {
                return NotFound();
            }

            var permission = _Context.Permissions.Where(q => q.Write == true && q.Signature == existingRide.Signature && q.User.Id == userId);
            if (permission == null)
            {
                return Unauthorized();
            }

            existingRide.Name = ride.Name;
            existingRide.Destination = ride.Destination;
            existingRide.Source = ride.Source;

            _Context.SaveChanges();

            return Ok(existingRide);
        }

        [HttpDelete("~/api/consumer/rides/{id}")]
        public IActionResult ConsumerDelete(int id)
        {
            var userId = _UserManager.GetUserId(User);

            var existingRide = _Context.Rides.Find(id);

            if (existingRide == null)
            {
                return NotFound();
            }

            var permission = _Context.Permissions.FirstOrDefault(q => q.Delete == true && q.Signature == existingRide.Signature && q.User.Id == userId);
            if (permission == null)
            {
                return Unauthorized();
            }

            _Context.Rides.Remove(existingRide);
            _Context.Permissions.Remove(permission);

            _Context.SaveChanges();

            return Ok(existingRide);
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpGet("~/api/admin/rides")]
        public IActionResult AdminGet(int page = 1, int size = 20)
        {
            var index = (Math.Max(page, 1) - 1) * size;

            var rides = _Context.Rides.Skip(index).Take(size).ToList();

            return Ok(rides);
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

            _Context.SaveChanges();

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
