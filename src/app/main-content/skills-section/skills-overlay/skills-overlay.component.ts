import { CommonModule } from '@angular/common';
import { Component, computed, inject, output, OutputEmitterRef, Signal } from '@angular/core';
import { SectionService } from '../../../shared/services/section.service';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { Skill } from '../../../shared/interfaces/skill';

@Component({
  selector: 'skills-overlay',
  imports: [
    CommonModule,
    TranslatePipe
  ],
  templateUrl: './skills-overlay.component.html'
})
export class SkillsOverlayComponent {
  protected skills: Skill[] = [
    { name: 'React', img: 'react' },
    { name: 'Vue.js', img: 'vue' }
  ];
  closed: OutputEmitterRef<void> = output<void>();
  private sec: SectionService = inject(SectionService);
  protected mobile: Signal<boolean> = computed(() => this.sec.mobile());

  close(): void {
    this.closed.emit();
  }
}
