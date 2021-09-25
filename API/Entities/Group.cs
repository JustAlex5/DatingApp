using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace API.Entities
{
    public class Group
    {
        public Group(string name)
        {
            Name = name;

            
        }

        public Group()
        {
        }

        [Key]
        public string Name { get; set; }

        public ICollection<Connection> Connections { get; set; } = new List<Connection>();
    }
}