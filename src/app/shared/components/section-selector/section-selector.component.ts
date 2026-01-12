import { Component, inject, input, InputSignal } from '@angular/core';
import { SectionService } from '../../services/section.service';

@Component({
  selector: 'section-selector',
  imports: [],
  templateUrl: './section-selector.component.html',
  styleUrl: './section-selector.component.css'
})
export class SectionSelectorComponent {
  index: InputSignal<number> = input<number>(0);
  sec: SectionService = inject(SectionService);
}
