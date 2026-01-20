import { Component, computed, HostListener, inject, Signal } from '@angular/core';
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
export class MainContentComponent {
  private sec: SectionService = inject(SectionService);
  protected mobile: Signal<boolean> = computed(() => this.sec.mobile());
  protected section: Signal<SectionType> = computed(() => this.sec.section());
  protected SectionType = SectionType;

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
  // #endregion
}
