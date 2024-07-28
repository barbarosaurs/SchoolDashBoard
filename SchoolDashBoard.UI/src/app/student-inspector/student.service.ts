import { Injectable } from '@angular/core';
import { Student } from '../../models/student';
import { Subject } from '../../models/subject';
import { Grade } from '../../models/grades';
import { Teacher } from '../../models/teachers';
import { StudentDataService } from '../data-store-service/student-data.service';
import { DataService } from '../data-store-service/data.service';
import { forkJoin } from 'rxjs';

class StudentData {
  teacher!: Teacher;
  average!: number;
  grades!: Grade[];

  constructor(teacher: Teacher, average: number, grades: Grade[]) {
    this.teacher = teacher;
    this.average = average;
    this.grades = grades;
  }
}


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(
        private studentDataService: StudentDataService, 
        private data: DataService,
  ) { }
  
  student!: Student;
  subjects!: Subject[];
  subjectData: { [key: number]: StudentData } = {};

  studentId!: number;
  selectStudent(studentId: number){
    this.student = this.data.students.find(student => student.id === studentId)!;

    this.studentDataService
        .getSubjects(studentId)
        .subscribe(m => { this.subjects = m } );
    
    this.studentId = studentId;
  }

  getSubjectData(subjectId: number) {
    forkJoin({
      teachers: this.studentDataService.getTeachersForSubject(   this.studentId, subjectId),
      average: this.studentDataService.getAverageGrades(   this.studentId, subjectId),
      grades: this.studentDataService.getGrades(   this.studentId, subjectId)
    }).subscribe(({ teachers, average, grades }) => {
      this.subjectData[subjectId] = new StudentData(teachers, average, grades);
    });
  }
  clear() {
    this.subjectData = {}
    this.subjects = [];
  }
}
