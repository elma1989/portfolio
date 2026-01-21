import { Component, signal, WritableSignal } from '@angular/core';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

type Project = {
  name: string,
  icon: string,
  background: string,
  flower: string,
  screenschot: string,
  skills: string[],
  github: string,
  url: string
}

@Component({
  selector: 'section[projects]',
  imports: [
    TranslatePipe
  ],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.css'
})
export class ProjectsSectionComponent {
  protected currentProject: WritableSignal<number> = signal(0);
  protected projects: Project[] = [
    {
      name: 'Join',
      icon: 'check',
      background: 'yellow',
      flower: 'orange',
      screenschot: 'join',
      skills: ['HTML', 'CSS', 'TypeScript', 'Angular', 'Firebase'],
      github: 'https://github.com/elma1989/join',
      url: 'https://marco-elste.developerakademie.net/angular-projects/join/'
    }, {
      name: 'El Pollo Loco',
      icon: 'ckicken',
      background: 'orange',
      flower: 'yellow',
      screenschot: 'join',
      skills: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/elma1989/join',
      url: 'https://marco-elste.developerakademie.net/el-pollo-loco/'
    }
  ]
}
