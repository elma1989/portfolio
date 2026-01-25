import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { CommonModule } from '@angular/common';
import { SectionService } from '../../shared/services/section.service';

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
      github: 'join',
      url: 'angular-projects/join/'
    }, {
      name: 'El Pollo Loco',
      icon: 'chicken',
      background: 'orange',
      flower: 'yellow',
      screenschot: 'el-pollo-loco',
      langKey: 'loco',
      skills: ['HTML', 'CSS', 'JavaScript'],
      github: 'el-pollo-loco',
      url: 'el-pollo-loco/'
    }
  ]
  overlay: WritableSignal<boolean> = signal<boolean>(false);
  private sec: SectionService = inject(SectionService);
  private _mobile: Signal<boolean> = computed(() => this.sec.mobile());

  get projects(): Project[] { return this._projects; };
  get index(): Signal<number> { return this._index.asReadonly() };
  get mobile(): Signal<boolean> { return this._mobile };

  // #region Navigation
  /** Shows previous project. */
  prev() {
    let i = this.index();
    i = i - 1 >= 0 ? i - 1 : this.projects.length - 1;
    this._index.set(i);
  }

  /** Shows next project. */
  next() {
    let i = this.index();
    i = i + i < this.projects.length - 1 ? i + 1 : 0;
    this._index.set(i);
  }
  // #endregion

  // #region Overlay
  /** Opens overlay on click. */
  openOnClick(): void {
    if(this.sec.mobile()) this.overlay.set(true);
  }

  /** Opens overlay on mousover. */
  openOnEnter(): void {
    if(!this.sec.mobile()) this.overlay.set(true);
  }

  /** Closes overlay on click on close-button. */
  closeOnClick(): void {
    if(this.sec.mobile()) this.overlay.set(false);
  }

  /** Closes overlay on leave */
  closeOnLeave(): void {
    if(!this.sec.mobile()) this.overlay.set(false);
  }
  // #endregion
}
