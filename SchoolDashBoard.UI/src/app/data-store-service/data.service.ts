import { Injectable } from '@angular/core';
import { StudentDataService } from './student-data.service';
import { TeacherDataService } from './teacher-data.service';


export type PersonRoles = 'student' | 'teacher'

@Injectable({
  providedIn: 'root'
})
export class DataService {
    constructor(
    private studentDataService: StudentDataService, 
    private teachDataService: TeacherDataService){}

    set(id: number, personRole: PersonRoles){
        if (personRole === 'student'){
        }
    }
}
