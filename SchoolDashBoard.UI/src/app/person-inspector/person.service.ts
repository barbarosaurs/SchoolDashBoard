import { Injectable } from '@angular/core';
import { PersonRoles } from '../data-store-service/data.service';
import { StudentService } from '../student-inspector/student.service';
import { TeacherService } from '../teacher-inspector/teacher.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private studentData: StudentService,
    private teacherData: TeacherService,
  ) { }

  currentPersonRole : PersonRoles = null; 
  currentId!: number;

  changePerson(id: number, personRole: PersonRoles){
    if (id === this.currentId && personRole === this.currentPersonRole){
      return;
    }
    this.cleanOldData();
    
    this.currentId = id;
    this.currentPersonRole = personRole;
    

    switch(this.currentPersonRole) { 
      case 'student': {
        this.studentData.selectStudent(this.currentId);
        break;
      }
      case 'teacher': {
        this.teacherData.selectStudent(this.currentId);
        break;
      }  
    }
  }

  cleanOldData(){
    switch(this.currentPersonRole) { 
      case 'student': {
        this.studentData.clear();
        break;
      }
      case 'teacher': {
        this.teacherData.clear();
        break;
      }  
    }
  }
}
