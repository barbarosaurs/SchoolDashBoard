import { Component } from '@angular/core';
import { DataService } from '../data-store-service/data.service';
import { StudentInspectorComponent } from "../student-inspector/student-inspector.component";
import { TeacherInspectorComponent } from "../teacher-inspector/teacher-inspector.component";
import { PersonService } from './person.service';

@Component({
  selector: 'app-person-inspector',
  standalone: true,
  imports: [StudentInspectorComponent, TeacherInspectorComponent],
  templateUrl: './person-inspector.component.html',
  styleUrl: './person-inspector.component.scss'
})
export class PersonInspectorComponent {
  constructor(
    public personData: PersonService,
    public data : DataService
  ){}
}
