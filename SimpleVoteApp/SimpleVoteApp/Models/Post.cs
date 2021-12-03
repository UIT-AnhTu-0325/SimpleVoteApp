using System;
using System.Collections.Generic;

#nullable disable

namespace SimpleVoteApp.Models
{
    public partial class Post
    {
        public Post()
        {
            Votes = new HashSet<Vote>();
        }

        public int Idpost { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int? SumVotes { get; set; }

        public virtual ICollection<Vote> Votes { get; set; }
    }
}
