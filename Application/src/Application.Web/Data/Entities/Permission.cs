using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Web.Data.Entities
{
    public class Permission
    {
        public int Id { get; set; }
        public Guid Signature { get; set; }
        public string Type { get; set; }
        public User User { get; set; }
        public bool Read { get; set; }
        public bool Write { get; set; }
        public bool Delete { get; set; }
        public bool Grant { get; set; }
    }
}
