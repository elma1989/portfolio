import { afterNextRender, AfterViewInit, Component, computed, effect, HostListener, inject, signal, Signal, WritableSignal } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { SectionService } from '../../services/section.service';
import { SectionType } from '../../enums/section-type';
import { CommonModule } from '@angular/common';
import { SocialMediaComponent } from '../social-media/social-media.component';
import { MenuOverlayComponent } from '../menu-overlay/menu-overlay.component';

@Component({
  selector: 'header[app-header]',
  imports: [
    CommonModule,
    SocialMediaComponent,
    MenuOverlayComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // #region Attributes
  private readonly ts: TranslationService = inject(TranslationService);
  private readonly sec: SectionService = inject(SectionService);
  protected lang: Signal<'en' | 'de'> = computed(() => this.ts.lang());
  private section: Signal<SectionType> = computed(() => this.sec.section());
  private mobile: Signal<boolean> = computed(() => this.sec.mobile());
  private prevMobile: WritableSignal<boolean> = signal<boolean>(false);
  private needsToCalc: WritableSignal<boolean> = signal<boolean>(false);
  menu: WritableSignal<boolean> = signal<boolean>(false);
  private secPos: { id: string, top: number, bottom: number }[] = [];
  // #endregion

  // FIXME: Error message in breackpoint.
  constructor() {
    this.calcSecPos();
  }

  // #region Methods
  // #region Indicators
  /**
   * Checks, if social media is in on header.
   * @returns True if social media is on header.
   */
  hasSocialMedia() {
    if (this.mobile()) return false;
    return this.section() == SectionType.HERO;
  }

  /**
   * Checks if section is dark.
   * @returns True, if seciton is dark.
   */
  isSectionDark() {
    return this.section() == SectionType.ABOUT || this.section() == SectionType.PROJECTS;
  }

  /**
   * Check, if run on test-mode.
   * @returns True, if runs on test-mode.
   */
  isTestMode(): boolean {
    return typeof window == 'undefined' || !!(window as any).jasmine;
  }
  // #endregion

  /** Switches the language. */
  switchLang(): void {
    const lang: 'en' | 'de' = this.lang() == 'en' ? 'de' : 'en';
    this.ts.lang = lang
  }

  /** Opens the menu. */
  openMenu(): void {
    this.menu.set(true);
  }

  /** Closes the menu. */
  closeMenu(): void {
    this.menu.set(false);
  }

  // #region Scroll
  /**
   * Founds the section from id.
   * @param elemid - id of element
   * @returns founndet element.
   */
  private getElemnt(elemid: string) {
    return document.getElementById(elemid)!
  }

  /** Calculates sections positions. */
  private calcSecPos() {
    const secIds = ['hero', 'about', 'skills', 'projects', 'references', 'contact'];

    if (this.mobile()) {
      this.secPos = secIds.map(id => {
        const elem: HTMLElement | null = this.getElemnt(id);
        const rect = elem?.getBoundingClientRect();
        if (!rect) return {id, top:0, bottom:0};
        const top = rect.top + window.scrollY;
        const bottom = rect.top + rect.height;
        return { id, top, bottom };
      });
    }
  }

  @HostListener('window:scroll', [])
  onScroll() {
    if (!this.isTestMode() && this.mobile()) {
      const currentY = window.scrollY + 0.04 * window.innerHeight;
      for (const section of this.secPos) {
        if (currentY >= section.top && currentY < section.bottom)
          this.sec.section = section.id as SectionType
      }
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.sec.mobile = this.sec.isMobile();
    this.calcSecPos();
  }
  // #endregion
  // #endregion
}
