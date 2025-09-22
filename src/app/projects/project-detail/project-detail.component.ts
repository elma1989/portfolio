import { Component, Input } from '@angular/core';
import { Project } from '../../shared/classes/models/project';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { Router } from '@angular/router';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { LineType } from '../../shared/components/section-title/line-type';
import { TranslatePipe } from '@ngx-translate/core';
import { NavService } from '../../shared/services/nav.service';
import { CommonModule } from '@angular/common';
import { ProjectSkillComponent } from './project-skill/project-skill.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { NextButtonComponent } from './next-button/next-button.component';

@Component({
  selector: 'section[project-detail]',
  imports: [
    HeaderComponent,
    BackButtonComponent,
    SectionTitleComponent,
    TranslatePipe,
    CommonModule,
    ProjectSkillComponent,
    ButtonComponent,
    NextButtonComponent
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent {

  @Input({required:true}) project!:Project;
  protected readonly LineType = LineType;

  constructor(
    private router:Router,
    protected nav: NavService
  ){}

  /** Redirect to Main-Site. */
  goBack():void {
    this.router.navigate(['/'], {fragment: this.project.id});
  }

  /** Redirct to next project. */
  goNext():void {
    if (this.project.next) {
      this.router.navigate([this.project.next]);
    }
  }

  /** Redirect to previous project. */
  goPrevious():void {
    if (this.project.previous) {
      this.router.navigate([this.project.previous]);
    }
  }
}
