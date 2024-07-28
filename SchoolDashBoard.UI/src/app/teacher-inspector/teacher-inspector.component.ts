import { Component } from '@angular/core';
import { DataService } from '../data-store-service/data.service';
import { TeacherService } from './teacher.service';

@Component({
  selector: 'app-teacher-inspector',
  standalone: true,
  imports: [],
  templateUrl: './teacher-inspector.component.html',
  styleUrl: './teacher-inspector.component.scss'
})
export class TeacherInspectorComponent {
  constructor(
    public teacherData: TeacherService,
    public data: DataService){}
}
