import { Component, Input } from '@angular/core';
import { Project } from '../../shared/classes/models/project';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  imports: [
    HeaderComponent,
    BackButtonComponent
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent {

  @Input({required:true}) project!:Project;

  constructor(private router:Router){}

  /** Redirect to Main-Site. */
  goBack():void {
    console.log(`#${this.project.id}`);
    this.router.navigate(['/'], {fragment: this.project.id});
  }

}
