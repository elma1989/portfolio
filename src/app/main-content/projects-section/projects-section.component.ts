import { Component, Signal, signal, WritableSignal } from '@angular/core';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { CommonModule } from '@angular/common';

type Project = {
  name: string,
  icon: string,
  background: string,
  flower: string,
  screenschot: string,
  langKey: string,
  skills: string[],
  github: string,
  url: string
}

@Component({
  selector: 'section[projects]',
  imports: [
    TranslatePipe,
    CommonModule
  ],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.css'
})
export class ProjectsSectionComponent {
  private _index: WritableSignal<number> = signal(0);
  private _projects: Project[] = [
    {
      name: 'Join',
      icon: 'check',
      background: 'yellow',
      flower: 'orange',
      screenschot: 'join',
      langKey: 'join',
      skills: ['HTML', 'CSS', 'TypeScript', 'Angular', 'Firebase'],
      github: 'https://github.com/elma1989/join',
      url: 'https://marco-elste.developerakademie.net/angular-projects/join/'
    }, {
      name: 'El Pollo Loco',
      icon: 'ckicken',
      background: 'orange',
      flower: 'yellow',
      screenschot: 'el-pollo-loco',
      langKey: 'loco',
      skills: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/elma1989/join',
      url: 'https://marco-elste.developerakademie.net/el-pollo-loco/'
    }
  ]

  get projects(): Project[] { return this._projects; };
  get index(): Signal<number> { return this._index.asReadonly() };
}
