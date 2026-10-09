import { Component, computed, inject, Signal } from '@angular/core';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { CommonModule } from '@angular/common';
import { SectionSelectorComponent } from '../../shared/components/section-selector/section-selector.component';
import { SectionService } from '../../shared/services/section.service';

type Reference = {
  name: string,
  fullName: string,
  position: string
}

@Component({
  selector: 'section[references]',
  imports: [
    TranslatePipe,
    CommonModule,
    SectionSelectorComponent
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
  private sec: SectionService = inject(SectionService);
  private _desktop = computed(() => !this.sec.mobile());
  
  get reference(): Reference { return this.ref; }

  get desktop(): Signal<boolean> { return this._desktop; }
}
