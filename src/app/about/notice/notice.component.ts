import { Component, Input } from '@angular/core';
import { NoteType } from './note-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notice',
  imports: [
    CommonModule,
  ],
  templateUrl: './notice.component.html',
  styleUrl: './notice.component.scss'
})
export class NoticeComponent {
  @Input({required: true}) type!: NoteType;
  @Input({required: true}) desc!: string;
  protected readonly NoteType = NoteType;
}
