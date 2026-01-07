import { CommonModule } from '@angular/common';
import { Component, input, InputSignal, signal, WritableSignal } from '@angular/core';

type Media =  {
  link: string,
  light: string,
  lightHover: string,
  dark: string,
  darkHover: string,
  hover: boolean
}

@Component({
  selector: 'social-media',
  imports: [
    CommonModule
  ],
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
      darkHover: 'github-dark-hover.svg',
      hover: false
    }, {
      link: 'https://linkedin.com',
      light: 'linkedin-light.svg',
      lightHover: 'linkedin-light-hover.svg',
      dark: 'linkedin-dark.svg',
      darkHover: 'linkedin-dark-hover.svg',
      hover: false
    }, {
      link: 'mailto: marco.elste@web.de',
      light: 'mail-light.svg',
      lightHover: 'mail-light-hover.svg',
      dark: 'mail-dark.svg',
      darkHover: 'mail-dark-hover.svg',
      hover: false
    }
  ]

  /**
   * Gets source from Index of Medias-Arrray.
   * @param index Index of medias
   * @returns Source image
   */
  getImg(index:number) {
    if (this.dark()) return this.medias[index].hover 
      ? this.medias[index].darkHover
      : this.medias[index].dark
    else return this.medias[index].hover
      ? this.medias[index].lightHover
      : this.medias[index].light
  }
}
