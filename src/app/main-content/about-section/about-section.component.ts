import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { SectionSelectorComponent } from '../../shared/components/section-selector/section-selector.component';
import { CommonModule } from '@angular/common';
import { SectionService } from '../../shared/services/section.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { SectionType } from '../../shared/enums/section-type';

@Component({
  selector: 'section[about]',
  imports: [
    CommonModule,
    SectionSelectorComponent,
    TranslatePipe
  ],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.css'
})
export class AboutSectionComponent {
  private sec: SectionService = inject(SectionService);
  private _desktop: Signal<boolean> = computed(() => !this.sec.mobile());
  private _overlay: WritableSignal<boolean> = signal<boolean>(false);

  get desktop(): Signal<boolean> { return this._desktop};

  get overlay(): Signal<boolean> { return this._overlay.asReadonly()};

  /** Goes to contact. */
  goToContact(): void {
    this.sec.section = SectionType.CONTACT;
    if (!this.desktop()) {
      const contact = document.getElementById('contact');
      contact?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // #region Overlay
  /**opens Overlay */
  openOvelay(): void {
    this._overlay.set(true);
  }

  /** Opens Overlay on click. */
  openOverlayOnClick(): void {
    if(!this.desktop()) this.openOvelay();
  }

  /** Opens Overlay on hover. */
  openOverlayOnHover(): void {
    if(this.desktop()) this.openOvelay();
  }

  /** closees overlay. */
  closeOverlay(): void {
    this._overlay.set(false);
  }

  /** Closes Overlay on leave. */
  closeOverlayOnLeave(): void {
    if(this.desktop()) this.closeOverlay();
  }

  
  // #endregion
}
