import { Component } from '@angular/core';
import { DataService } from '../data-store-service/data.service';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { CommonModule, DatePipe } from '@angular/common';
import { StudentService } from './student.service';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-student-inspector',
  standalone: true,
  imports: [AccordionModule, TableModule, DatePipe, CardModule, CommonModule],
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

  getGradeColor(grade: number): string {
    // Define color stops
    const colors = [
      { stop: 2, color: { r: 255, g: 0, b: 0 } }, // Red
      { stop: 3, color: { r: 255, g: 165, b: 0 } }, // Orange
      { stop: 4, color: { r: 0, g: 128, b: 0 } }, // Green
      { stop: 5, color: { r: 0, g: 100, b: 0 } } // Dark Green
    ];

    // Find two colors between which the grade lies
    let lower = colors[0];
    let upper = colors[colors.length - 1];
    for (let i = 1; i < colors.length; i++) {
      if (grade < colors[i].stop) {
        upper = colors[i];
        lower = colors[i - 1];
        break;
      }
    }

    const t = (grade - lower.stop) / (upper.stop - lower.stop);
    const r = Math.round(lower.color.r + t * (upper.color.r - lower.color.r));
    const g = Math.round(lower.color.g + t * (upper.color.g - lower.color.g));
    const b = Math.round(lower.color.b + t * (upper.color.b - lower.color.b));

    return `rgb(${r},${g},${b})`;
  }
}
