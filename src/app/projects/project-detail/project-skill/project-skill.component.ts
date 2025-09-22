import { Component, Input } from '@angular/core';
import { Skill } from '../../../shared/classes/models/skill';

@Component({
  selector: 'app-project-skill',
  imports: [],
  templateUrl: './project-skill.component.html',
  styleUrl: './project-skill.component.scss'
})
export class ProjectSkillComponent {
  @Input({required:true}) skill!:Skill
}
