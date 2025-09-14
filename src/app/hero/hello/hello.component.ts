import { Component } from '@angular/core';
import { NavService } from '../../shared/services/nav.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-hello',
  imports: [
    TranslatePipe,
  ],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.scss'
})
export class HelloComponent {

  constructor (public nav: NavService) {}

}
