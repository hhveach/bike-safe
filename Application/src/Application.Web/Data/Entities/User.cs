using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Web.Data.Entities
{
    public class User : IdentityUser
    {
        public string Image { get; set;  }
        public string Name { get; set; }
        public virtual Bike Bike { get; set; }
        public virtual ICollection<Ride> Rides { get; set; }
        public virtual ICollection<Hazard> Hazards { get; set; }
        public virtual ICollection<Feature> Features { get; set; }
        public virtual ICollection<Permission> Permissions { get; set; }

        public User()
        {
            Rides = new List<Ride>();
            Hazards = new List<Hazard>();
            Features = new List<Feature>();
            Permissions = new List<Permission>();
        }
    }
}
