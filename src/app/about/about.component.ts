import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactBtnComponent } from '../shared/components/contact-btn/contact-btn.component';
import { NoticeComponent } from './notice/notice.component';

@Component({
  selector: 'section[app-about]',
  imports: [
    TranslatePipe,
    ContactBtnComponent,
    NoticeComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
