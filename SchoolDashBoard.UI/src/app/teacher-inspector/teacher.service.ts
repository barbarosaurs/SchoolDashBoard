import { Injectable } from '@angular/core';
import { Teacher } from '../../models/teachers';
import { Student } from '../../models/student';
import { TeacherDataService } from '../data-store-service/teacher-data.service';
import { Subject } from '../../models/subject';
import { DataService } from '../data-store-service/data.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(
    private data: DataService,
    private teachDataService: TeacherDataService
  ) { }

  teacher!: Teacher;
  teacherId!: number;
  subjects: Subject[] = [];
  students: Student[] = [];

  selectStudent(teacherId: number){
    this.teacher = this.data.teachers.find(teacher => teacher.id === teacherId)!;
    this.teacherId = teacherId;

    this.teachDataService
        .getStudents( this.teacherId)
        .subscribe(m => { this.students = m } );


    this.teachDataService
        .getSubjects( this.teacherId)
        .subscribe(m => { this.subjects = m } );
}

  clear(){
    this.students= [];
  }
}
