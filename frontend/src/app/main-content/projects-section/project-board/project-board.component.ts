import { Component, computed, inject, input, InputSignal, Signal, signal, WritableSignal } from '@angular/core';
import { SectionService } from '../../../shared/services/section.service';
import { Project } from '../../../shared/interfaces/project';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'project-board',
  imports: [
    CommonModule,
    TranslatePipe
  ],
  templateUrl: './project-board.component.html',
  styleUrl: './project-board.component.css'
})
export class ProjectBoardComponent {
  project: InputSignal<Project> = input.required<Project>()
  overlay: WritableSignal<boolean> = signal<boolean>(false);
  private sec: SectionService = inject(SectionService);
  protected mobile: Signal<boolean> = computed(() => this.sec.mobile());

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
