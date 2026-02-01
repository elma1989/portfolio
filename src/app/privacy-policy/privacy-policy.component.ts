import { Component, inject } from '@angular/core';
import { SectionService } from '../shared/services/section.service';
import { SectionType } from '../shared/enums/section-type';
import { HeaderComponent } from '../shared/components/header/header.component';
import { TranslatePipe } from '../shared/pipes/translate.pipe';

@Component({
  selector: 'privacy-policy',
  imports: [
    HeaderComponent,
    TranslatePipe
  ],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css'
})
export class PrivacyPolicyComponent {
  private sec: SectionService = inject(SectionService);

  constructor() {
    this.sec.section = SectionType.SKILLS;
  }
}
