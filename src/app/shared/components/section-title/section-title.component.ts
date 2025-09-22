import { Component, Input } from '@angular/core';
import { LineType } from './line-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-title',
  imports: [
    CommonModule,
  ],
  templateUrl: './section-title.component.html',
  styleUrl: './section-title.component.scss'
})
export class SectionTitleComponent {
  @Input() line: LineType = LineType.NONE;
  @Input({required:true}) title!: string;
  @Input() overline: string | null = null;
  protected readonly LineType = LineType;
}
