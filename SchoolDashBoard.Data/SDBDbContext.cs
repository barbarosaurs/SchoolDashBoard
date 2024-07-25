namespace SchoolDashBoard.Data;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.Reflection;

public class SDBDbContext : DbContext
{
    public SDBDbContext(DbContextOptions<SDBDbContext> options) : base(options) { }
    public DbSet<Teacher> Teachers => Set<Teacher>();
    public DbSet<Student> Students => Set<Student>();
    public DbSet<Subject> Subjects => Set<Subject>();
    public DbSet<Grade> Grades => Set<Grade>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        var teachers = GenerateTeacher(10);
        var students = GenerateStudents(100, teachers);
        var subjects = GenerateSubjects(1000, teachers, students);
        var grades = GenerateGrades(10000, subjects);

        builder.Entity<Teacher>().HasData(teachers);
        builder.Entity<Student>().HasData(students);
        builder.Entity<Subject>().HasData(subjects);
        builder.Entity<Grade>().HasData(grades);
    }

    private List<Teacher> GenerateTeacher(int count)
    {
        var teacherIds = 1;
        var teacherCodes = new HashSet<string>();
        var faker = new Bogus.Faker<Teacher>()
            .RuleFor(t => t.Id, f => teacherIds++)
            .RuleFor(t => t.FirstName, f => f.Name.FirstName())
            .RuleFor(t => t.LastName, f => f.Name.LastName())
            .RuleFor(t => t.TeacherCode, f => {
                  string code;
                  do
                  {
                      code = f.Random.AlphaNumeric(10);
                  } while (!teacherCodes.Add(code)); 
                  return code;
             });

        return faker.Generate(count);
    }

    private List<Student> GenerateStudents(int count, List<Teacher> teachers)
    {
        var studentCodes = new HashSet<string>();
        var teacherIds = teachers.Select(t => t.Id).ToList();
        var studentId = 1;

        var faker = new Bogus.Faker<Student>()
            .RuleFor(t => t.Id, f => studentId++)
            .RuleFor(t => t.FirstName, f => f.Name.FirstName())
            .RuleFor(s => s.LastName, f => f.Name.LastName())
            .RuleFor(s => s.TeacherId, f => f.PickRandom(teacherIds))
            .RuleFor(s => s.StudentCode, f =>
            {
                string code;
                do
                {
                    code = f.Random.AlphaNumeric(6);
                } while (!studentCodes.Add(code)); 
                return code;
            });

        return faker.Generate(count);
    }

    private List<Subject> GenerateSubjects(int count, List<Teacher> teachers, List<Student> students)
    {
        var teacherIds = teachers.Select(t => t.Id).ToList();
        var studentIds = students.Select(s => s.Id).ToList();
        var subjectId = 1;

        var faker = new Bogus.Faker<Subject>()
            .RuleFor(t => t.Id, f => subjectId++)
            .RuleFor(s => s.Name, f => f.Random.Word())
            .RuleFor(s => s.TeacherId, f => f.PickRandom(teacherIds))
            .RuleFor(s => s.StudentId, f => f.PickRandom(studentIds));

        return faker.Generate(count);
    }
    private List<Grade> GenerateGrades(int count, List<Subject> subjects)
    {
        var subjectIds = subjects.Select(s => s.Id).ToList();
        var gradeId = 1;

        var faker = new Bogus.Faker<Grade>()
            .RuleFor(t => t.Id, f => gradeId++)
            .RuleFor(g => g.Value, f => f.Random.Int(1, 5))
            .RuleFor(g => g.SubjectId, f => f.PickRandom(subjectIds))
            .RuleFor(g => g.CreatedOn, f => f.Date.Past(1));

        return faker.Generate(count);
    }
}
public class SDBDbContextFactory : IDesignTimeDbContextFactory<SDBDbContext>
{
    public SDBDbContext CreateDbContext(string[]? args = null)
    {
        var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();

        var optionsBuilder = new DbContextOptionsBuilder<SDBDbContext>();
        optionsBuilder.UseSqlite(configuration["ConnectionStrings:DefaultConnection"]);

        return new SDBDbContext(optionsBuilder.Options);
    }
}
