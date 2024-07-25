import { Component, OnInit } from '@angular/core';
import { StudentDataService } from '../data-store-service/student-data.service';
import { Student } from '../../models/student';
import { AccordionModule } from 'primeng/accordion';
import { TeacherDataService } from '../data-store-service/teacher-data.service';
import { Teacher } from '../../models/teachers';
import { DataService, PersonRoles } from '../data-store-service/data.service';

@Component({
  selector: 'app-tree-view',
  standalone: true,
  imports: [AccordionModule],
  templateUrl: './tree-view.component.html',
  styleUrl: './tree-view.component.scss'
})
export default class TreeViewComponent implements OnInit{
  students: Student[] = [];
  teachers: Teacher[] = [];

  constructor(
    private studentDataService: StudentDataService, 
    private teachDataService: TeacherDataService,
    private dataService : DataService){
  }

  ngOnInit(): void {
    this.studentDataService.getStudents().subscribe((data: Student[]) => {
      this.students = data;
    }, error => {
      console.error('Error fetching students:', error);
    });

    this.teachDataService.getTeachers().subscribe((data: Teacher[]) => {
      this.teachers = data;
    }, error => {
      console.error('Error fetching students:', error);
    });
  }

  selectPerson(id: number, personRole: PersonRoles){
    this.dataService.set(id, personRole);
  }
}
