import { afterNextRender, AfterViewInit, Component, computed, effect, HostListener, inject, input, InputSignal, signal, Signal, WritableSignal } from '@angular/core';
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
  socialMedia: InputSignal<boolean> = input<boolean>(false);
  private readonly ts: TranslationService = inject(TranslationService);
  private readonly sec: SectionService = inject(SectionService);
  protected lang: Signal<'en' | 'de'> = computed(() => this.ts.lang());
  private section: Signal<SectionType> = computed(() => this.sec.section());
  private mobile: Signal<boolean> = computed(() => this.sec.mobile());
  menu: WritableSignal<boolean> = signal<boolean>(false);
  // #endregion

  // #region Methods
  // #region Indicators

  /**
   * Checks if section is dark.
   * @returns True, if seciton is dark.
   */
  isSectionDark() {
    return this.section() == SectionType.ABOUT || this.section() == SectionType.PROJECTS;
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
  // #endregion
}
