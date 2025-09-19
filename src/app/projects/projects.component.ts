import { Component } from '@angular/core';
import { SectionTitleComponent } from '../shared/components/section-title/section-title.component';
import { TranslatePipe } from '@ngx-translate/core';
import { LineType } from '../shared/components/section-title/line-type';

@Component({
  selector: 'section[app-projects]',
  imports: [
    SectionTitleComponent,
    TranslatePipe
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  protected readonly LineType = LineType;
}
