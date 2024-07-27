import { Injectable, signal } from '@angular/core';
import { StudentDataService } from './student-data.service';
import { TeacherDataService } from './teacher-data.service';
import { Subject } from '../../models/subject';
import { Student } from '../../models/student';
import { Teacher } from '../../models/teachers';
import { Grade } from '../../models/grades';

export type PersonRoles = 'student' | 'teacher' | null;

@Injectable({
  providedIn: 'root'
})
export class DataService {
    constructor(
    private studentDataService: StudentDataService, 
    private teachDataService: TeacherDataService){}
    
    cruetPersonRole = signal<PersonRoles>(null);
    students: Student[] = [];
    teachers: Teacher[] = [];
    subjects: Subject[] = [];

    studentTeacher: Teacher | null = null;
    average: number = 0;
    grades: Grade[] = []; 
    id: number = 0;
      // teacher
    subjectsTeachers: Subject[] = [];
    studentsTeachers: Student[] = [];


    currentRole: PersonRoles = null;
    set(id: number, personRole: PersonRoles){
      if (personRole === this.currentRole && this.id === id){
        return;
      }
      this.grades = [];
      this.average = 0;
      this.studentTeacher = null;
      
      this.id = id;
        this.cruetPersonRole.set(personRole);
        if (personRole === 'student'){
          this.studentDataService
          .getSubjects(id)
          .subscribe(m => { this.subjects = m } );
        } else if (personRole === 'teacher'){
          this.teachDataService
          .getStudents(id)
          .subscribe(m => { this.studentsTeachers = m } );


          this.teachDataService
          .getSubjects(id)
          .subscribe(m => { this.subjectsTeachers = m } );
        }
    }

    getStudentData(subjectId: number){
      this.studentDataService
      .getTeachersForSubject(this.id, subjectId)
      .subscribe(m => { this.studentTeacher = m ; } );

      this.studentDataService
      .getGrades(this.id, subjectId)
      .subscribe(m => { this.grades = m ; console.log(m)} );

      this.studentDataService
      .getAverageGrades(this.id, subjectId)
      .subscribe(m => { this.average = m ; console.log(m)} );
    }
    
}
