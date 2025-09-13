import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { NavService } from '../../shared/services/nav.service';

@Component({
  selector: 'app-mob-overlay',
  imports: [
    HeaderComponent,
  ],
  templateUrl: './mob-overlay.component.html',
  styleUrl: './mob-overlay.component.scss'
})
export class MobOverlayComponent {
  constructor(public nav: NavService) {}
}
