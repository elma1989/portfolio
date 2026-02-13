import { Component, computed, HostListener, inject, signal, Signal, WritableSignal } from '@angular/core';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { SectionService } from '../../shared/services/section.service';
import { SectionType } from '../../shared/enums/section-type';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SectionSelectorComponent } from '../../shared/components/section-selector/section-selector.component';

@Component({
  selector: 'section[hero]',
  imports: [
    TranslatePipe,
    CommonModule,
    SectionSelectorComponent
  ],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
  private readonly sec: SectionService = inject(SectionService);
  protected readonly mobile: Signal<boolean> = computed(() => this.sec.mobile());
  protected bigScreen: WritableSignal<boolean> = signal<boolean>(false);

  constructor() {
    this.bigScreen.set(this.isBigScreen());
  }

  get fullName(): string {
    return this.mobile() || this.isBigScreen() ? 'Marco Elste' : 'Marco';
  }

  /** Goes to contect-section. */
  goToContact(): void {
    this.sec.section = SectionType.CONTACT;

    if(this.mobile()) {
      document.getElementById('contact')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.bigScreen.set(this.isBigScreen());
  }
  
  private isBigScreen():boolean {return window.innerWidth >= 1920};
}
