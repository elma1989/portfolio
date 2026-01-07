import { Component, input, InputSignal, signal, WritableSignal } from '@angular/core';

type Media =  {
  link: string,
  light: string,
  lightHover: string,
  dark: string,
  darkHover: string
}

@Component({
  selector: 'social-media',
  imports: [],
  templateUrl: './social-media.component.html',
  styleUrl: './social-media.component.css'
})
export class SocialMediaComponent {
  dark: InputSignal<boolean> = input<boolean>(false);
  gitHover: WritableSignal<boolean> = signal<boolean>(false);
  linkedinHover: WritableSignal<boolean> = signal<boolean>(false);
  mailHover: WritableSignal<boolean> = signal<boolean>(false);

  medias: Media[] = [
    {
      link: 'https://github.com/elma1989/',
      light: 'github-light.svg',
      lightHover: 'github-light-hover.svg',
      dark: 'github-dark.svg',
      darkHover: 'github-dark-hover.svg'
    }, {
      link: 'linkedin.com',
      light: 'linkedin-light.svg',
      lightHover: 'linkedin-light-hover.svg',
      dark: 'linkedin-dark.svg',
      darkHover: 'linkedin-dark-hover.svg'
    }, {
      link: 'mailto: marco.elste@web.de',
      light: 'mail-light.svg',
      lightHover: 'mail-light-hover.svg',
      dark: 'mail-dark.svg',
      darkHover: 'mail-dark-hover.svg'
    }
  ]
}
