import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-lang-sel',
  imports: [
    CommonModule,
  ],
  templateUrl: './lang-sel.component.html',
  styleUrl: './lang-sel.component.scss'
})
export class LangSelComponent {
  constructor (public nav:NavService) {}
}
