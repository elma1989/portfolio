import { Component } from '@angular/core';
import fd from './form.json'
import { CommonModule } from '@angular/common';
import { NavService } from '../../shared/services/nav.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'form[app-form]',
  imports: [
    CommonModule,
    TranslatePipe
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  protected readonly data:{
    id:string,
    en:{
      label:string,
      placeholder:string,
      error:string
    },
    de:{
      label:string,
      placeholder:string,
      error:string
    }
  }[] = fd;

  constructor(protected nav:NavService){}

  getPolicyLink():string {
    return `<a href="#">${this.nav.curLang == 0 ? 'privacy policy' : "Datenschutzrichtlinie"}</a>`
    // TODO: Create Privacy Policy
  }

  getPolicyLabel():string {
      return this.nav.curLang == 0 ? `I've read the ${this.getPolicyLink()} and agree to processing of my data as outlined` : `Ich habe die ${this.getPolicyLink()} gelesen und bin mit der Verwendung meiner Daten einverstanden.`
  }
}
