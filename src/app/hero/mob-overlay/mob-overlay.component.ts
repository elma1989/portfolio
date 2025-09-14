import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { NavService } from '../../shared/services/nav.service';
import { CommonModule } from '@angular/common';
import { LangSelComponent } from '../../shared/components/lang-sel/lang-sel.component';

@Component({
  selector: 'app-mob-overlay',
  imports: [
    HeaderComponent,
    CommonModule,
    LangSelComponent
  ],
  templateUrl: './mob-overlay.component.html',
  styleUrl: './mob-overlay.component.scss'
})
export class MobOverlayComponent {
  constructor(public nav: NavService) {}
}
