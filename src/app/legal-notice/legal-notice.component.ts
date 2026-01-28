import { Component, inject, Signal } from '@angular/core';
import { HeaderComponent } from "../shared/components/header/header.component";
import { SectionService } from '../shared/services/section.service';
import { SectionType } from '../shared/enums/section-type';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../shared/pipes/translate.pipe';

@Component({
  selector: 'legal-notice',
  imports: [
    HeaderComponent,
    CommonModule,
    TranslatePipe
  ],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.css'
})
export class LegalNoticeComponent {
  private sec: SectionService = inject(SectionService);

  constructor() {
    this.sec.section = SectionType.SKILLS;
  }

  get mobile(): Signal<boolean> { return this.sec.mobile; }
}
