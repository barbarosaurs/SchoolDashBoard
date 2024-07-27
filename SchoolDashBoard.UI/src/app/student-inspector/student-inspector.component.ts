import { Component } from '@angular/core';
import { DataService } from '../data-store-service/data.service';

@Component({
  selector: 'app-student-inspector',
  standalone: true,
  imports: [],
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
