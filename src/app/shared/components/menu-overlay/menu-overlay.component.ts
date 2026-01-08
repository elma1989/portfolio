import { Component, output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'menu-overlay',
  imports: [],
  templateUrl: './menu-overlay.component.html',
  styleUrl: './menu-overlay.component.css'
})
export class MenuOverlayComponent {
  closed: OutputEmitterRef<void> = output();

  close(): void {
    this.closed.emit();
  }
}
