import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-btn',
  imports: [
    TranslatePipe,
  ],
  templateUrl: './contact-btn.component.html',
  styleUrl: './contact-btn.component.scss'
})
export class ContactBtnComponent {

}
