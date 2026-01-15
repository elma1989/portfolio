import { Component, computed, inject, output, OutputEmitterRef, Signal } from '@angular/core';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { SectionService } from '../../../shared/services/section.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'about-overlay',
  imports: [
    TranslatePipe,
    CommonModule
  ],
  templateUrl: './about-overlay.component.html',
  styleUrl: './about-overlay.component.css'
})
export class AboutOverlayComponent {
  closed: OutputEmitterRef<void> = output<void>();
  private sec: SectionService = inject(SectionService);
  private _mobile: Signal<boolean> = computed(() => this.sec.mobile());
  protected items: string[] = [
    'first', 'second', 'third', 'fourth', 'fifth', 'sixth'
  ];

  get mobile(): Signal<boolean> { return this._mobile; }

  /** Closes overlay */
  close(): void {
    this.closed.emit();
  }
}
