import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-skill-summary',
  imports: [
    TranslatePipe
  ],
  templateUrl: './skill-summary.component.html',
  styleUrl: './skill-summary.component.scss'
})
export class SkillSummaryComponent {

}
