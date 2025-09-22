import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-next-button',
  imports: [],
  templateUrl: './next-button.component.html',
  styleUrl: './next-button.component.scss'
})
export class NextButtonComponent {
  @Input({required:true}) desc!:string;
}
