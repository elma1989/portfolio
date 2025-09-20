import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NoticeComponent } from './notice/notice.component';
import { NoteType } from './notice/note-type';
import { SectionTitleComponent } from '../shared/components/section-title/section-title.component';
import { LineType } from '../shared/components/section-title/line-type';
import { ButtonComponent } from '../shared/components/button/button.component';

@Component({
  selector: 'section[app-about]',
  imports: [
    TranslatePipe,
    ButtonComponent,
    NoticeComponent,
    SectionTitleComponent
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  protected readonly LineType = LineType;
  protected readonly NoteType = NoteType;
}
