import { Component, computed, inject, Signal } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'header[app-header]',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private readonly ts!: TranslationService;
  private lang!: Signal<'en'|'de'>;

  constructor() {
    this.ts = inject(TranslationService);
    this.lang = computed(() => this.ts.lang());
  }

  hasSocialMedia() {
    return false;
  }

  isSectionDark() {
    return false;
  }

  switchLang() {

  }
}
