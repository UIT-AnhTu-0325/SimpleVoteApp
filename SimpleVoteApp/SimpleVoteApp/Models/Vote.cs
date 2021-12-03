using System;
using System.Collections.Generic;

#nullable disable

namespace SimpleVoteApp.Models
{
    public partial class Vote
    {
        public int Idvote { get; set; }
        public int Iduser { get; set; }
        public int Idpost { get; set; }
        public DateTime VoteDate { get; set; }

        public virtual Post IdpostNavigation { get; set; }
        public virtual User IduserNavigation { get; set; }
    }
}
