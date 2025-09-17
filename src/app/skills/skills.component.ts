import { Component } from '@angular/core';
import { SectionTitleComponent } from '../shared/components/section-title/section-title.component';
import { LineType } from '../shared/components/section-title/line-type';
import { TranslatePipe } from '@ngx-translate/core';
import { NavService } from '../shared/services/nav.service';
import { CommonModule } from '@angular/common';
import { SkillSummaryComponent } from './skill-summary/skill-summary.component';

@Component({
  selector: 'section[app-skills]',
  imports: [
    SectionTitleComponent,
    TranslatePipe,
    CommonModule,
    SkillSummaryComponent
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  protected readonly LineType = LineType;
  constructor(public nav:NavService){}
}
