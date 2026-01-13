import { Component, Signal, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'section[about]',
  imports: [],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.css'
})
export class AboutSectionComponent {
  private _overlay: WritableSignal<boolean> = signal<boolean>(false);

  get overlay(): Signal<boolean> { return this._overlay.asReadonly()};
}
