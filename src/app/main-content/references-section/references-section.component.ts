import { Component } from '@angular/core';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'section[references]',
  imports: [
    TranslatePipe
  ],
  templateUrl: './references-section.component.html',
  styleUrl: './references-section.component.css'
})
export class ReferencesSectionComponent {

}
