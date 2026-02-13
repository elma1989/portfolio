import { Component, inject, Signal } from '@angular/core';
import { HeaderComponent } from "../shared/components/header/header.component";
import { SectionService } from '../shared/services/section.service';
import { SectionType } from '../shared/enums/section-type';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../shared/pipes/translate.pipe';
import { InprintParagraphComponent } from './inprint-paragraph/inprint-paragraph.component';
import { FooterComponent } from '../shared/components/footer/footer.component';

type InprintParagraph = {
  id: string,
  numberParagraphs: number
}

@Component({
  selector: 'legal-notice',
  imports: [
    HeaderComponent,
    CommonModule,
    TranslatePipe,
    InprintParagraphComponent,
    FooterComponent
  ],
  templateUrl: './legal-notice.component.html'
})
export class LegalNoticeComponent {
  private sec: SectionService = inject(SectionService);
  private readonly ps: InprintParagraph[] = [
    {id: 'acceptance', numberParagraphs: 1},
    {id: 'ownership', numberParagraphs: 2},
    {id: 'rights', numberParagraphs: 1},
    {id: 'use', numberParagraphs: 1},
    {id: 'disclaimer', numberParagraphs: 1},
    {id: 'indemnity', numberParagraphs: 1}
  ]

  get mobile(): Signal<boolean> { return this.sec.mobile; }

  get paragraphs(): InprintParagraph[] { return this.ps; }

  /**
   * Creates an array of numbers from 1 to maximum of paragraphs.
   * @param value - maximum paragraphs.
   * @returns - Counter-Array.
   */
  getCounter(value: number): number[] {
    const numbers: number[] = [];
    for(let i = 1; i<= value; i++) {
      numbers.push(i);
    }
    return numbers;
  }
}
