import { AfterViewInit, Component, computed, HostListener, inject, Signal } from '@angular/core';
import { SectionService } from '../shared/services/section.service';
import { CommonModule } from '@angular/common';
import { SectionType } from '../shared/enums/section-type';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { AboutSectionComponent } from './about-section/about-section.component';
import { SkillsSectionComponent } from './skills-section/skills-section.component';
import { ProjectsSectionComponent } from './projects-section/projects-section.component';
import { ReferencesSectionComponent } from './references-section/references-section.component';
import { ContactSectionComponent } from './contact-section/contact-section.component';
import { HeaderComponent } from "../shared/components/header/header.component";

@Component({
  selector: 'app-main-content',
  imports: [
    CommonModule,
    HeroSectionComponent,
    AboutSectionComponent,
    SkillsSectionComponent,
    ProjectsSectionComponent,
    ReferencesSectionComponent,
    ContactSectionComponent,
    HeaderComponent
],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent implements AfterViewInit {
  private sec: SectionService = inject(SectionService);
  protected mobile: Signal<boolean> = computed(() => this.sec.mobile());
  protected section: Signal<SectionType> = computed(() => this.sec.section());
  protected SectionType = SectionType;
  private secPos: { id: string, top: number, bottom: number }[] = [];

  ngAfterViewInit(): void {
    this.calcSecPos();
  }

  // #region Background-Indicator
  isBackgroundBlue(): boolean {
    return this.section() == SectionType.HERO
    || this.section() == SectionType.REFERENCES;
  }

  isBackgroundBlack(): boolean {
    return this.section() == SectionType.SKILLS
    || this.section() == SectionType.CONTACT;
  }

  isBackgroundWhite(): boolean {
    return this.section() == SectionType.ABOUT
    || this.section() == SectionType.PROJECTS;
  }

  /**
   * Check, if run on test-mode.
   * @returns True, if runs on test-mode.
   */
  isTestMode(): boolean {
    return typeof window == 'undefined' || !!(window as any).jasmine;
  }
  // #endregion

// #region Scroll
  /**
   * Founds the section from id.s
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
    this.sec.mobile = window.innerWidth < 1024;
    this.calcSecPos();
  }
  // #endregion
}
