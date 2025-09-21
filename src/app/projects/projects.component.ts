import { Component } from '@angular/core';
import { SectionTitleComponent } from '../shared/components/section-title/section-title.component';
import { TranslatePipe } from '@ngx-translate/core';
import { LineType } from '../shared/components/section-title/line-type';
import { ProjectService } from '../shared/services/project.service';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';

@Component({
  selector: 'section[app-projects]',
  imports: [
    SectionTitleComponent,
    TranslatePipe,
    ProjectOverviewComponent
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  protected readonly LineType = LineType;

  constructor(
    public ps:ProjectService) {}
}
