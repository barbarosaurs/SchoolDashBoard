import { Component } from '@angular/core';
import { DataService } from '../data-store-service/data.service';
import { TeacherService } from './teacher.service';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { Student } from '../../models/student';
import { PersonService } from '../person-inspector/person.service';

@Component({
  selector: 'app-teacher-inspector',
  standalone: true,
  imports: [AccordionModule,TableModule],
  templateUrl: './teacher-inspector.component.html',
  styleUrl: './teacher-inspector.component.scss'
})
export class TeacherInspectorComponent {
  constructor(
    public teacherData: TeacherService,
    public data: DataService,
    public personData: PersonService){}

    selectStudent(event: any){    
      this.personData.changePerson(event.data.id, 'student');
    }
}
