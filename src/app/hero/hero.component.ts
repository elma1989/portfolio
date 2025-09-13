import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { MobOverlayComponent } from './mob-overlay/mob-overlay.component';

@Component({
  selector: 'section[app-hero]',
  imports: [
    HeaderComponent,
    MobOverlayComponent
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {

}
