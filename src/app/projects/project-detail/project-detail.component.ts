import { Component, Input } from '@angular/core';
import { Project } from '../../shared/classes/models/project';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-project-detail',
  imports: [
    HeaderComponent
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent {

  @Input({required:true}) project!:Project;

}
