using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace SimpleVoteApp.Models
{
    public partial class MyAppDBContext : DbContext
    {
        public MyAppDBContext()
        {
        }

        public MyAppDBContext(DbContextOptions<MyAppDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Post> Posts { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Vote> Votes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Name=MyAppDB");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Post>(entity =>
            {
                entity.HasKey(e => e.Idpost)
                    .HasName("PK__Posts__8B0115BD6341EF10");

                entity.Property(e => e.Idpost).HasColumnName("IDPost");

                entity.Property(e => e.Content)
                    .IsRequired()
                    .HasColumnType("text");

                entity.Property(e => e.SumVotes).HasDefaultValueSql("((0))");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Iduser)
                    .HasName("PK__Users__EAE6D9DFB0838A44");

                entity.HasIndex(e => e.UserName, "UC_Users")
                    .IsUnique();

                entity.Property(e => e.Iduser).HasColumnName("IDUser");

                entity.Property(e => e.Password)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Vote>(entity =>
            {
                entity.HasKey(e => e.Idvote)
                    .HasName("PK__Votes__83F2B3EB02D75499");

                entity.Property(e => e.Idvote).HasColumnName("IDVote");

                entity.Property(e => e.Idpost).HasColumnName("IDPost");

                entity.Property(e => e.Iduser).HasColumnName("IDUser");

                entity.Property(e => e.VoteDate).HasColumnType("datetime");

                entity.HasOne(d => d.IdpostNavigation)
                    .WithMany(p => p.Votes)
                    .HasForeignKey(d => d.Idpost)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PostVote");

                entity.HasOne(d => d.IduserNavigation)
                    .WithMany(p => p.Votes)
                    .HasForeignKey(d => d.Iduser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserVote");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
