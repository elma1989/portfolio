import { Component, computed, inject, Signal } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { SectionService } from '../../services/section.service';
import { SectionType } from '../../enums/section-type';
import { CommonModule } from '@angular/common';
import { SocialMediaComponent } from '../social-media/social-media.component';

@Component({
  selector: 'header[app-header]',
  imports: [
    CommonModule,
    SocialMediaComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private readonly ts: TranslationService = inject(TranslationService);
  private readonly sec: SectionService = inject(SectionService);
  protected lang: Signal<'en'|'de'> = computed(() => this.ts.lang());
  private section: Signal<SectionType> = computed(() => this.sec.section());
  private mobile: Signal<boolean> = computed(() => this.sec.mobile());

  /**
   * Checks, if social media is in on header.
   * @returns True if social media is on header.
   */
  hasSocialMedia() {
    if(this.mobile()) return false;
    return this.section() == SectionType.HERO;
  }

  /**
   * Checks if section is dark.
   * @returns True, if seciton is dark.
   */
  isSectionDark() {
    return this.section() == SectionType.ABOUT || this.section() == SectionType.PROJECTS;
  }

  /** Switches the language. */
  switchLang() {
    const lang: 'en'|'de' = this.lang() == 'en' ? 'de' : 'en';
    this.ts.lang = lang
  }
}
