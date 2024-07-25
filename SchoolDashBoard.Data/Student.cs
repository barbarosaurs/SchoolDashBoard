namespace SchoolDashBoard.Data;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class Student
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public int TeacherId { get; set; }
    public string StudentCode { get; set; } = string.Empty;

    public Teacher Teacher { get; set; }
    public ICollection<Subject> Subjects { get; set; } = new List<Subject>();
}

public class StudentTypeConfiguration : IEntityTypeConfiguration<Student>
{
    public void Configure(EntityTypeBuilder<Student> builder)
    {
        builder.HasKey(u => u.Id);
        builder.Property(u => u.FirstName).HasMaxLength(100);
        builder.Property(u => u.LastName).HasMaxLength(100);
        builder.HasIndex(u => new { u.StudentCode }).IsUnique();
        builder.Property(u => u.StudentCode).HasMaxLength(10).IsFixedLength(true);
        builder.HasOne(s => s.Teacher)
              .WithMany(t => t.Students)
              .HasForeignKey(s => s.TeacherId);
    }
}