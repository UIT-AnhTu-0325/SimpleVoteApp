using System;
using System.Collections.Generic;

#nullable disable

namespace SimpleVoteApp.Models
{
    public partial class User
    {
        public User()
        {
            Votes = new HashSet<Vote>();
        }

        public int Iduser { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }

        public virtual ICollection<Vote> Votes { get; set; }
    }
}
