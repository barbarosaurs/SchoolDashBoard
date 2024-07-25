import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../../models/student';
import { Observable } from 'rxjs';
import { Subject } from '../../models/subject';
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
    const url = `${this.apiUrl}/${id}/students`;
    return this.http.get<Subject[]>(url);
  }
}
