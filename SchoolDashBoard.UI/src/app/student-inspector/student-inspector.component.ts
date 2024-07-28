import { Component } from '@angular/core';
import { DataService } from '../data-store-service/data.service';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { StudentService } from './student.service';

@Component({
  selector: 'app-student-inspector',
  standalone: true,
  imports: [AccordionModule, TableModule,DatePipe],
  templateUrl: './student-inspector.component.html',
  styleUrl: './student-inspector.component.scss'
})
export class StudentInspectorComponent {
  constructor
  (
    public data: DataService,
    public studentData: StudentService
  ){}

  openSubject(subjectId: number){
    this.studentData.getSubjectData(subjectId);
  }
}
