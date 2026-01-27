import { Component } from '@angular/core';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

type Reference = {
  name: string,
  fullName: string,
  position: string
}

@Component({
  selector: 'section[references]',
  imports: [
    TranslatePipe
  ],
  templateUrl: './references-section.component.html',
  styleUrl: './references-section.component.css'
})
export class ReferencesSectionComponent {
  private ref: Reference = {
    name: 'marcus',
    fullName: 'Marcus Gühne',
    position: 'Team Partner'
  }

  get reference(): Reference {return this.ref; }
}
