import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';
import TreeViewComponent from './tree-view/tree-view.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PersonInspectorComponent } from "./person-inspector/person-inspector.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, SplitterModule, TreeViewComponent, ScrollPanelModule, PersonInspectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SchoolDashBoard.UI';
}
