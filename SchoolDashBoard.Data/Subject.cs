namespace SchoolDashBoard.Data;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class Subject
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int TeacherId { get; set; }
    public int StudentId { get; set; }

    public Student Student { get; set; }
    public Teacher Teacher { get; set; }
    public ICollection<Grade> Grades { get; set; } = new List<Grade>();
}

public class SubjectTypeConfiguration : IEntityTypeConfiguration<Subject>
{
    public void Configure(EntityTypeBuilder<Subject> builder)
    {
        builder.HasKey(u => u.Id);
        builder.Property(u => u.Name).HasMaxLength(100);
        builder.HasOne(s => s.Teacher)
                  .WithMany(t => t.Subjects)
                  .HasForeignKey(s => s.TeacherId);
        builder.HasOne(s => s.Student)
               .WithMany(st => st.Subjects)
               .HasForeignKey(s => s.StudentId);
    }
}