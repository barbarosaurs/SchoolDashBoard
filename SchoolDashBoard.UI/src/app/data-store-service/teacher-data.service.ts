import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../../models/teachers';
import { Student } from '../../models/student';
import { Subject } from '../../models/subject';
@Injectable({
  providedIn: 'root'
})
export class TeacherDataService {
  private apiUrl = 'http://localhost:5282/teacher';

  constructor(private http: HttpClient) {}

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl);
  }

  getStudents(id: number) : Observable<Student[]> {
    const url = `${this.apiUrl}/${id}/students`;
    return this.http.get<Student[]>(url);
  }

  getSubjects(id: number) : Observable<Subject[]> {
    const url = `${this.apiUrl}/${id}/subjects`;
    return this.http.get<Subject[]>(url);
  }
}
