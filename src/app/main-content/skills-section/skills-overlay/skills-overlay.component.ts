import { CommonModule } from '@angular/common';
import { Component, computed, inject, output, OutputEmitterRef, Signal } from '@angular/core';
import { SectionService } from '../../../shared/services/section.service';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'skills-overlay',
  imports: [
    CommonModule,
    TranslatePipe
  ],
  templateUrl: './skills-overlay.component.html',
  styleUrl: './skills-overlay.component.css'
})
export class SkillsOverlayComponent {
  closed: OutputEmitterRef<void> = output<void>();
  private sec: SectionService = inject(SectionService);
  protected mobile: Signal<boolean> = computed(() => this.sec.mobile());

  close(): void {
    this.closed.emit();
  }
}
