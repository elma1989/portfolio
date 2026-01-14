import { Component, output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'about-overlay',
  imports: [],
  templateUrl: './about-overlay.component.html',
  styleUrl: './about-overlay.component.css'
})
export class AboutOverlayComponent {
  closed: OutputEmitterRef<void> = output<void>();

  /** Closes overlay */
  close(): void {
    this.closed.emit();
  }
}
