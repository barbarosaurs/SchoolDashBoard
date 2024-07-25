import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../../models/teachers';
import { Student } from '../../models/student';
@Injectable({
  providedIn: 'root'
})
export class TeacherDataService {
  private apiUrl = 'http://localhost:5282/teacher';

  constructor(private http: HttpClient) {}

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl);
  }


  getStudents(teacherId: number){
    const url = `${this.apiUrl}/${teacherId}/students`;
    return this.http.get<Student[]>(url);
  } 
}
