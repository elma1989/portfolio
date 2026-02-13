import { AfterViewInit, Component, computed, HostListener, inject, Signal } from '@angular/core';
import { SectionService } from '../shared/services/section.service';
import { CommonModule, ViewportScroller } from '@angular/common';
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
  private scroller: ViewportScroller = inject(ViewportScroller);
  protected mobile: Signal<boolean> = computed(() => this.sec.mobile());
  protected section: Signal<SectionType> = computed(() => this.sec.section());
  protected SectionType = SectionType;
  private secPos: { id: string, top: number, bottom: number }[] = [];
  private sections: SectionType[] = [
    SectionType.HERO, SectionType.ABOUT, SectionType.SKILLS,
    SectionType.PROJECTS, SectionType.REFERENCES, SectionType.CONTACT
  ]

  ngAfterViewInit(): void {
    this.calcSecPos();
    this.sec.loadSection();
    this.moveToCurrentSection();
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

  // #region Section
  /**
   * Gets the index of current section.
   * @returns Index of section.
   */
  private getSectionIndex(): number {
    switch(this.sec.section()) {
      case SectionType.HERO:
        return 0;
      case SectionType.ABOUT:
        return 1;
      case SectionType.SKILLS:
        return 2;
      case SectionType.PROJECTS:
        return 3;
      case SectionType.REFERENCES:
        return 4;
      case SectionType.CONTACT:
        return 5;
    }
  }

  /**
   * Changes the section from index.
   * @param index - Index of section.
   */
  private selectSection(index: number): void {
    if(index >= 0 && index < this.sections.length) 
      this.sec.section = this.sections[index];
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

  /** Will be executed on scrollikng. */
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

  /** Will be executed on resizing. */
  @HostListener('window:resize')
  onResize() {
    this.sec.mobile = window.innerWidth < 1024;
    this.calcSecPos();
    this.moveToCurrentSection();
  }

  /** Jumps to current section on load */
  private moveToCurrentSection() {
    this.scroller.scrollToAnchor(this.section());
  }

  /** Checks mouse wheel on desktop. */
  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent) {
    if(!this.mobile()) {
      const index: number = this.getSectionIndex();
      if (event.deltaY > 0)
        this.selectSection(index + 1);
      else if(event.deltaY < 0)
        this.selectSection(index - 1);
    }
  }
  // #endregion

  /**
   * Checks, if social media is in on header.
   * @returns True if social media is on header.
   */
  hasSocialMedia() {
    if (this.mobile()) return false;
    return this.section() == SectionType.HERO;
  }
}
