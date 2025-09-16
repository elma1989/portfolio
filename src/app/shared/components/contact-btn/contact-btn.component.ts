import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact-btn',
  imports: [],
  templateUrl: './contact-btn.component.html',
  styleUrl: './contact-btn.component.scss'
})
export class ContactBtnComponent {
  @Input({required: true}) description!:string;
  @Input() btnclass:string = '';
}
