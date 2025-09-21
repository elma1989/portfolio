import { Component, Input} from '@angular/core';
import { Project } from '../../shared/classes/models/project';
import { NavService } from '../../shared/services/nav.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'article[app-project-overview]',
  imports: [
    ButtonComponent,
    TranslatePipe
  ],
  templateUrl: './project-overview.component.html',
  styleUrl: './project-overview.component.scss'
})
export class ProjectOverviewComponent {
  
  @Input({required:true}) project!:Project;

  constructor(
    public nav:NavService,
    private router:Router
  ) {}

  /** Loads the main project site. */
  goToProject():void {
    this.router.navigate([this.project.url]);
  }

}
