import { Component } from '@angular/core';
import { NavService } from '../../shared/services/nav.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hello',
  imports: [
    TranslatePipe,
  ],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.scss'
})
export class HelloComponent {

  public hoverHello: boolean = false;

  constructor (public nav: NavService, private translate:TranslateService) {}

  getDescription():string {
    return this.hoverHello ? this.translate.instant('hello') : 'Hello World';
  }
}
