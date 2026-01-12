import { Component, inject, input, InputSignal } from '@angular/core';
import { SectionService } from '../../services/section.service';
import { SectionType } from '../../enums/section-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'section-selector',
  imports: [
    CommonModule
  ],
  templateUrl: './section-selector.component.html'
})
export class SectionSelectorComponent {
  index: InputSignal<number> = input<number>(0);
  private sec: SectionService = inject(SectionService);
  protected selectors: SectionType[] = [
    SectionType.HERO,
    SectionType.ABOUT,
    SectionType.SKILLS,
    SectionType.PROJECTS,
    SectionType.REFERENCES,
    SectionType.CONTACT
  ]

  // #region Methods
  /**
   * Checks. if section has dark theme.
   * @returns True, if section has dark theme.
   */
  private hasDarkTheme(): boolean {
    const section = this.sec.section();
    return section == SectionType.ABOUT || section == SectionType.PROJECTS;
  }

  /**
   * Gets section-symbol from index.
   * @param index - Index of section.
   * @returns - Content-Symbol for section.
   */
  protected getContent(index: number): string {
    return this.index() == index ? '◆' : '●';
  }

  /**
   * Gets CSS-Color-Class form index of section.
   * @param index - Index of section.
   * @returns - CSS Class for txt-color.
   */
  protected getColorClass(index: number): string {
    if (this.index() == index) return 'tx-orange'
    return this.hasDarkTheme() ? 'tx-black' : 'tx-white'
  }

  /**
   * Changes section on click on button.
   * @param index - Index of Section.
   */
  protected changeSection(index: number): void {
    if(index >= 0 && index < 6) this.sec.section = this.selectors[index];
  }
  // #endregion
}
