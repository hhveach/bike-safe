using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Web.Data.Entities
{
    public class Bike
    {
        public int Id { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public string Image { get; set; }
    }
}
