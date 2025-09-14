import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavService } from '../../services/nav.service';
import { LangSelComponent } from '../lang-sel/lang-sel.component';
import { LogoComponent } from '../../logo/logo.component';

@Component({
  selector: 'header[app-header]',
  imports: [
    CommonModule,
    LogoComponent,
    LangSelComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public nav:NavService) {}
}