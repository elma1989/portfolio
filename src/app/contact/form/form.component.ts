import { Component } from '@angular/core';
import fd from './form.json'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'form[app-form]',
  imports: [
    CommonModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  protected readonly data = fd;
}
