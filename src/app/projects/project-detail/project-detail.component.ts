import { Component, Input } from '@angular/core';
import { Project } from '../../shared/classes/models/project';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { Router } from '@angular/router';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { LineType } from '../../shared/components/section-title/line-type';

@Component({
  selector: 'app-project-detail',
  imports: [
    HeaderComponent,
    BackButtonComponent,
    SectionTitleComponent
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent {

  @Input({required:true}) project!:Project;
  protected readonly LineType = LineType;

  constructor(private router:Router){}

  /** Redirect to Main-Site. */
  goBack():void {
    console.log(`#${this.project.id}`);
    this.router.navigate(['/'], {fragment: this.project.id});
  }

}
