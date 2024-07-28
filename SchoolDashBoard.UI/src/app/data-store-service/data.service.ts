import { Injectable } from '@angular/core';
import { Student } from '../../models/student';
import { Teacher } from '../../models/teachers';

export type PersonRoles = 'student' | 'teacher' | null;

@Injectable({
  providedIn: 'root'
})
export class DataService {
    constructor(){}
    students: Student[] = [];
    teachers: Teacher[] = [];
}
