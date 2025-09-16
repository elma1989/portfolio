import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactBtnComponent } from '../shared/components/contact-btn/contact-btn.component';
import { NoticeComponent } from './notice/notice.component';
import { NoteType } from './notice/note-type';
import { SectionTitleComponent } from '../shared/components/section-title/section-title.component';

@Component({
  selector: 'section[app-about]',
  imports: [
    TranslatePipe,
    ContactBtnComponent,
    NoticeComponent,
    SectionTitleComponent
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  protected readonly NoteType = NoteType;
}
