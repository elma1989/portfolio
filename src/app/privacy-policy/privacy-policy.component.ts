import { Component, inject } from '@angular/core';
import { SectionService } from '../shared/services/section.service';
import { SectionType } from '../shared/enums/section-type';

@Component({
  selector: 'privacy-policy',
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css'
})
export class PrivacyPolicyComponent {
  private sec: SectionService = inject(SectionService);

  constructor() {
    this.sec.section = SectionType.SKILLS;
  }
}
