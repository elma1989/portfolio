import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { Skill } from '../../shared/interfaces/skill';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { CommonModule } from '@angular/common';
import { SectionService } from '../../shared/services/section.service';

@Component({
  selector: 'section[skills]',
  imports: [
    TranslatePipe,
    CommonModule
  ],
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
  private sec: SectionService = inject(SectionService);
  private mobile: Signal<boolean> = computed(() => this.sec.mobile());
  private _overlay: WritableSignal<boolean> = signal<boolean>(false);

  get overlay(): Signal<boolean> { return this._overlay.asReadonly(); }

  // #region Overlay
  /** Opens overlay anytime. */
  openOverylay(): void {
    this._overlay.set(true)
  }
  /** Opens overlay on click. */
  openOverlayOnClick(): void {
    if(this.mobile()) this.openOverylay()
  }

  /** Opens overlay on hover. */
  openOverlayOnHover(): void {
    if(!this.mobile()) this.openOverylay();
  }

  /** Closes overlay anytime. */
  closeOverlay(): void {
    this._overlay.set(false);
  }

  /** Closes overlay on leave. */
  closeOverlayOnLeave(): void {
    if(!this.mobile()) this.closeOverlay();
  }
  // #endregion
}
