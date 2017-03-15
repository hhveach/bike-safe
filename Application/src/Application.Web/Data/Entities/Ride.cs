using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Web.Data.Entities
{
    public class Ride
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Source { get; set; }
        [Required]
        public string Destination { get; set; }
        public Guid Signature { get; set; }
    }
}
