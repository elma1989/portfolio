import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero-title',
  imports: [

  ],
  templateUrl: './hero-title.component.html',
  styleUrl: './hero-title.component.scss'
})
export class HeroTitleComponent {
  @Input({required: true}) public title!: string;

  getLetter(index: number): string {
    let code = this.title.charCodeAt(index);
    code = (code <= 90) ? code + 32 : code - 32;
    return String.fromCharCode(code);
  }
}
