namespace SchoolDashBoard.API.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolDashBoard.Data;
using SchoolDashBoard.DTO;
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("[controller]")]
public class TeacherController : ControllerBase
{
    private readonly SDBDbContext _context;

    public TeacherController(SDBDbContext context)
    {
        _context = context;
    }

    [HttpGet("")]
    public async Task<IActionResult> GetAllStudents()
    {
        var students = await _context.Teachers
            .Select(s => new TeacherDto
            {
                Id = s.Id,
                FirstName = s.FirstName,
                LastName = s.LastName,
                TeacherCode = s.TeacherCode
            })
            .ToListAsync();

        if (!students.Any())
        {
            return NotFound();
        }

        return Ok(students);
    }


    [HttpGet("{teacherId}/students")]
    public async Task<IActionResult> GetStudentsForTeacher(int teacherId)
    {
        var students = await _context.Students
            .Where(t => t.TeacherId == teacherId)
            .Select(s => new StudentDto
            {
                Id = s.Id,
                FirstName = s.FirstName,
                LastName = s.LastName,
                StudentCode = s.StudentCode
            })
            .ToListAsync();

        if (students == null)
        {
            return NotFound();
        }

        return Ok(students);
    }

    [HttpGet("{teacherId}/subjects")]
    public async Task<IActionResult> GetSubjectsForTeacher(int teacherId)
    {
        var subjects = await _context.Subjects
            .Where(s => s.TeacherId == teacherId)
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
}
