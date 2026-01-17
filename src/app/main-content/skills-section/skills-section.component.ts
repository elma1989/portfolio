import { Component } from '@angular/core';
import { Skill } from '../../shared/interfaces/skill';

@Component({
  selector: 'section[skills]',
  imports: [],
  templateUrl: './skills-section.component.html',
  styleUrl: './skills-section.component.css'
})
export class SkillsSectionComponent {
  protected skills: Skill[] = [
        { name: 'HTML', img: 'html' },
        { name: 'CSS', img: 'css' },
        { name: 'Tailwind', img: 'tw' },
        { name: 'JavaScript', img: 'js' },
        { name: 'TypeScript', img: 'ts' },
        { name: 'Angular', img: 'ng' },
        { name: 'Firebase', img: 'fb' },
        { name: 'Git', img: 'git' },
        { name: 'REST-API', img: 'api' },
        { name: 'Scrum', img: 'scrum' },
        { name: 'Material Design', img: 'mat' },
        { name: 'Python', img: 'py' },
        { name: 'Flask', img: 'flask' }
      ];
}
