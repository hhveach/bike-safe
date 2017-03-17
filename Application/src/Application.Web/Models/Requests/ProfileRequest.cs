using Application.Web.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Web.Models.Requests
{
    public class ProfileRequest
    {
        public string Name { get; set; }
        public Bike Bike { get; set; }
    }
}
