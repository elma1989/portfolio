import { Component } from '@angular/core';
import { Project } from '../../shared/classes/models/project';
import { ProjectService } from '../../shared/services/project.service';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';

@Component({
  selector: 'app-el-pollo-loco',
  imports: [
    ProjectDetailComponent
  ],
  templateUrl: './el-pollo-loco.component.html',
  styleUrl: './el-pollo-loco.component.scss'
})
export class ElPolloLocoComponent {
  
  public project: Project;

  constructor(private ps:ProjectService) {
    this.project = ps.projects[0]
  }
}
