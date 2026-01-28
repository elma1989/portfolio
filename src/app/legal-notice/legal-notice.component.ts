import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../shared/components/header/header.component";
import { SectionService } from '../shared/services/section.service';
import { SectionType } from '../shared/enums/section-type';

@Component({
  selector: 'legal-notice',
  imports: [HeaderComponent],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.css'
})
export class LegalNoticeComponent {
  private sec: SectionService = inject(SectionService);

  constructor() {
    this.sec.section = SectionType.SKILLS;
  }
}
