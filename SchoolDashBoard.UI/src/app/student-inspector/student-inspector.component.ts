import { Component } from '@angular/core';
import { DataService } from '../data-store-service/data.service';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';

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
    public data: DataService
  ){}

  averageGrad = 0;

  selectSubject(subjectId: number){
    this.data.getStudentData(subjectId);

  }
}
