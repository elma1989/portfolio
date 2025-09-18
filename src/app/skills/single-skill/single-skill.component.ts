import { Component, Input } from '@angular/core';
import { Skill } from '../../shared/classes/models/skill';

@Component({
  selector: 'app-single-skill',
  imports: [],
  templateUrl: './single-skill.component.html',
  styleUrl: './single-skill.component.scss'
})
export class SingleSkillComponent {
  @Input({required:true}) skill!: Skill;
}
