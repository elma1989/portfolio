import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input({required: true}) description!:string;
  @Input() btnclass:string = '';
  @Input({required: true}) ref!:string;
  @Input() fragment: string|null = null;
  @Input() external:boolean = false;

  constructor(private router:Router){}

  fallow() {
    if (this.fragment) {
      this.router.navigate([this.ref], {fragment: this.fragment});  
    } else {
      this.router.navigate([this.ref]);
    }
  }

  open() {
    window.open(this.ref, '_blank');
  }
}
