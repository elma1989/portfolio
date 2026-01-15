import { Component, computed, inject, Signal } from '@angular/core';
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
  private readonly router: Router = inject(Router)
  protected readonly mobile: Signal<boolean> = computed(() => this.sec.mobile());

  /** Goes to contect-section. */
  goToContact(): void {
    this.sec.section = SectionType.CONTACT;

    if(this.mobile()) {
      document.getElementById('contact')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } 
}
