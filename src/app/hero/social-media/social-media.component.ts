import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-social-media',
  imports: [
    CommonModule,
  ],
  templateUrl: './social-media.component.html',
  styleUrl: './social-media.component.scss'
})
export class SocialMediaComponent {
  public socialMedias: {name: string, url:string, img:string}[] = [
    {name:'linkedin', url: '', img: 'linkedin.svg'},
    {name: 'github', url: 'https://github.com/elma1989', img: 'github.svg'},
    {name: 'mail', url: 'mailto:marco.elste@web.de', img: 'mail.svg'}
  ]
}
