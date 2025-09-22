import { Component } from '@angular/core';
import { SectionTitleComponent } from '../shared/components/section-title/section-title.component';
import { TranslatePipe } from '@ngx-translate/core';
import { LineType } from '../shared/components/section-title/line-type';

@Component({
  selector: 'section[app-testimonials]',
  imports: [
    SectionTitleComponent,
    TranslatePipe
  ],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {
  protected LineType = LineType;
}
