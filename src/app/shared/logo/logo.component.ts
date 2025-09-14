import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logo',
  imports: [
    CommonModule,
  ],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  public hoverVisible: boolean = false;

  constructor(private router: Router) {}

  setHover(state:boolean):void {
    this.hoverVisible = state;
  }

  goToStart() {
    this.router.navigate(['/']);
  }
}
