import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'social-media',
  imports: [],
  templateUrl: './social-media.component.html',
  styleUrl: './social-media.component.css'
})
export class SocialMediaComponent {
  dark: InputSignal<boolean> = input<boolean>(false);
}
