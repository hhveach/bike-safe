using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Web.Data.Entities
{
    public class Hazard
    {
        public int Id { get; set; }
        [Required]
        public string Type { get; set;}
        [Required]
        public double Latitude { get; set; }
        [Required]
        public double Longitude { get; set; }
        public Guid Signature { get; set; }
    }
}
