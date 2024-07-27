import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../../models/student';
import { Observable } from 'rxjs';
import { Subject } from '../../models/subject';
import { Teacher } from '../../models/teachers';
import { Grade } from '../../models/grades';
@Injectable({
  providedIn: 'root'
})
export class StudentDataService  {
  private apiUrl = 'http://localhost:5282/student';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getSubjects(id: number): Observable<Subject[]> {
    const url = `${this.apiUrl}/${id}/subjects`;
    return this.http.get<Subject[]>(url);
  }

  getTeachersForSubject(studentId : number, subjectId: number){
    const url = `${this.apiUrl}/${studentId}/subjects/${subjectId}/teacher`;
    return this.http.get<Teacher>(url);
  }

  getGrades(studentId : number, subjectId: number){
    const url = `${this.apiUrl}/${studentId}/subjects/${subjectId}/grades`;
    return this.http.get<Grade[]>(url);
  }

    getAverageGrades(studentId : number, subjectId: number){
    const url = `${this.apiUrl}/${studentId}/subjects/${subjectId}/grades/average`;
    return this.http.get<number>(url);
  }
}
