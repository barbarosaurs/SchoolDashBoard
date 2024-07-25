namespace SchoolDashBoard.Data;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class Grade
{
    public int Id { get; set; }
    public int Value { get; set; }
    public int SubjectId { get; set; } 
    public DateTime CreatedOn { get; set; }

    public Subject Subject { get; set; }
}

public class GradeTypeConfiguration : IEntityTypeConfiguration<Grade>
{
    public void Configure(EntityTypeBuilder<Grade> builder)
    {
        builder.HasKey(u => u.Id);
        builder.Property(u => u.Value).HasMaxLength(100);
        builder.HasOne(g => g.Subject)
                 .WithMany(s => s.Grades)
                 .HasForeignKey(g => g.SubjectId);
    }
}