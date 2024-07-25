namespace SchoolDashBoard.API.Controllers;

using Bogus;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolDashBoard.Data;
using SchoolDashBoard.DTO;
using System.Linq;
using System.Threading.Tasks;


[ApiController]
[Route("[controller]")]
public class StudentController : ControllerBase
{
    private readonly SDBDbContext _context;
    public StudentController(SDBDbContext context)
    {
        _context = context;
    }

    [HttpGet("{studentId}/subjects")]
    public async Task<IActionResult> GetAllSubjects(int studentId)
    {
        var subjects = await _context.Subjects
            .Where(s => s.StudentId == studentId)
            .Select(s => new SubjectDto
            {
                Id = s.Id,
                Name = s.Name
            })
            .ToListAsync();

        if (!subjects.Any())
        {
            return NotFound();
        }

        return Ok(subjects);
    }

    [HttpGet("{studentId}/subjects/{subjectId}/teacher")]
    public async Task<IActionResult> GetTeacherForStudentSubject(int studentId, int subjectId)
    {
        var subject = await _context.Subjects
            .Include(s => s.Teacher)
            .FirstOrDefaultAsync(s => s.Id == subjectId && s.StudentId == studentId);

        if (subject == null || subject.Teacher == null)
        {
            return NotFound();
        }

        var teacherDto = new TeacherDto
        {
            Id = subject.Teacher.Id,
            FirstName = subject.Teacher.FirstName,
            LastName = subject.Teacher.LastName,
            TeacherCode = subject.Teacher.TeacherCode
        };

        return Ok(teacherDto);
    }


    [HttpGet("{studentId}/subjects/{subjectId}/grades")]
    public async Task<IActionResult> GetGradesForStudentSubject(int studentId, int subjectId)
    {
        var grades = await GetGrades(studentId, subjectId);


        if (!grades.Any())
        {
            return NotFound();
        }

        return Ok(grades);
    }
   
    [HttpGet("{studentId}/subjects/{subjectId}/grades/average")]
    public async Task<IActionResult> GetAverageGradesForStudentSubject(int studentId, int subjectId)
    {
        var grades = await GetGrades(studentId, subjectId);
        var average = grades.Average(s => s.Value);

        if (!grades.Any())
        {
            return NotFound();
        }

        return Ok(average);
    }

    private async Task<List<GradeDto>> GetGrades(int studentId, int subjectId)
    {
        var grades = await _context.Grades
              .Include(g => g.Subject)
              .Where(g => g.SubjectId == subjectId && g.Subject.StudentId == studentId)
              .Select(g => new GradeDto
              {
                  Id = g.Id,
                  Value = g.Value,
                  CreatedOn = g.CreatedOn
              })
              .ToListAsync();

        return grades;
    }

}