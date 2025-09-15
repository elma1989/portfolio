import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavService } from '../../services/nav.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-sel',
  imports: [
    CommonModule,
  ],
  templateUrl: './lang-sel.component.html',
  styleUrl: './lang-sel.component.scss'
})
export class LangSelComponent {

  private translate = inject(TranslateService)

  constructor (public nav:NavService) {
    this.useLanguage(nav.curLang)
  }

  useLanguage(langIndex:number): void {
    this.nav.setCurLang(langIndex);
    this.translate.use(this.nav.languages[langIndex]);
  }
}
