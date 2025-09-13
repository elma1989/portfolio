import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'header[app-header]',
  imports: [
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public nav:NavService) {}
}