import { Component, computed, inject, Signal } from '@angular/core';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { SectionService } from '../../shared/services/section.service';
import { SectionType } from '../../shared/enums/section-type';
import { Router } from '@angular/router';

@Component({
  selector: 'section[hero]',
  imports: [
    TranslatePipe
  ],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
  private readonly sec: SectionService = inject(SectionService);
  private readonly router: Router = inject(Router)
  private readonly mobile: Signal<boolean> = computed(() => this.sec.mobile());

  /** Goes to contect-section. */
  goToContact(): void {
    this.sec.section = SectionType.CONTACT;

    if(this.mobile()) {
      this.router.navigate([], { fragment: 'contact'});
    }
  }
}
