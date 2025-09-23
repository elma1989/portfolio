import { Component } from '@angular/core';
import { SectionTitleComponent } from '../shared/components/section-title/section-title.component';
import { TranslatePipe } from '@ngx-translate/core';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'section[app-contact]',
  imports: [
    SectionTitleComponent,
    TranslatePipe,
    FormComponent
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
