import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { MobOverlayComponent } from './mob-overlay/mob-overlay.component';
import { NavService } from '../shared/services/nav.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'section[app-hero]',
  imports: [
    HeaderComponent,
    MobOverlayComponent,
    CommonModule
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  constructor(public nav: NavService) {}
}
