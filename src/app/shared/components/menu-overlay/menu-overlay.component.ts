import { Component, inject, output, OutputEmitterRef } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { SectionType } from '../../enums/section-type';
import { SectionService } from '../../services/section.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

type NavItem = {
  transId: string,
  section: SectionType,
  navId: string
}

@Component({
  selector: 'menu-overlay',
  imports: [
    TranslatePipe,
    CommonModule
],
  templateUrl: './menu-overlay.component.html',
  styleUrl: './menu-overlay.component.css'
})
export class MenuOverlayComponent {
  closed: OutputEmitterRef<void> = output();
  sec: SectionService = inject(SectionService);
  router: Router = inject(Router);
  items: NavItem[] = [
    {
      transId: 'menu.about',
      section: SectionType.ABOUT,
      navId: 'about'
    }, {
      transId: 'menu.skill',
      section: SectionType.SKILLS,
      navId: 'skills'
    }, {
      transId: 'menu.project',
      section: SectionType.PROJECTS,
      navId: 'projects'
    }, {
      transId: 'menu.reference',
      section: SectionType.REFERENCES,
      navId: 'references'
    }, {
      transId: 'menu.contact',
      section: SectionType.CONTACT,
      navId: 'contact'
    }
  ]

  /** Closes the menu. */
  close(): void {
    this.closed.emit();
  }

  /**
   * Navigates to Section.
   * @param index Indes of NavItem
   */
  navigate(index: number) {
    if (index < 5) {
      this.sec.section = this.items[index].section;
    }
    this.close();
  }
}
