using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Web.Data.Entities
{
    public class User : IdentityUser
    {
        public ICollection<Ride> Rides { get; set; }
        public ICollection<Hazard> Hazards { get; set; }
        public ICollection<Feature> Features { get; set; }
        public ICollection<Permission> Permissions { get; set; }

        public User()
        {
            Rides = new List<Ride>();
            Hazards = new List<Hazard>();
            Features = new List<Feature>();
            Permissions = new List<Permission>();
        }
    }
}
