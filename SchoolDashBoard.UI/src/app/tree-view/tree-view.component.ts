import { Component, OnInit } from '@angular/core';
import { StudentDataService } from '../data-store-service/student-data.service';
import { AccordionModule } from 'primeng/accordion';
import { TeacherDataService } from '../data-store-service/teacher-data.service';
import { DataService } from '../data-store-service/data.service';
import { TreeModule } from 'primeng/tree';
import { PersonService } from '../person-inspector/person.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tree-view',
  standalone: true,
  imports: [AccordionModule, TreeModule, CommonModule],
  templateUrl: './tree-view.component.html',
  styleUrl: './tree-view.component.scss'
})
export default class TreeViewComponent implements OnInit{

  constructor(
    private studentDataService: StudentDataService, 
    private teachDataService: TeacherDataService,
    public personData: PersonService,
    public data : DataService){
  }

  ngOnInit(): void {
    this.studentDataService.getStudents().subscribe(m => this.data.students = m);
    this.teachDataService.getTeachers().subscribe(m => this.data.teachers = m);
  }
}
