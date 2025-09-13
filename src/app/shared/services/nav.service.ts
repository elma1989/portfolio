import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  // region Attributes
  public overlayOpen: boolean = false;
  public languages: string[] = ['en', 'de'];
  public curLang!:string;
  public links: {id:string, en:string, de:string, ref:string, img:string}[] = [
    {
      id:'nav-about',
      en: 'About me',
      de: 'Über mich',
      ref: '#',
      img: '1.png'
    }, {
      id:'nav-skill',
      en: 'Skills',
      de: 'Skills',
      ref: '#',
      img: '2.png'
    }, {
      id:'nav-project',
      en: 'Projects',
      de: 'Projekte',
      ref: '#',
      img: '3.png'
    }, {
      id:'nav-contact',
      en: 'Contact',
      de: 'Kontakt',
      ref: '#',
      img: '4.png'
    }
  ];
  // #endregion

  constructor() {
    this.curLang = this.getLang();
  }

  // #region Methods
  /**
   * Gets name of link.
   * @param index - Index of links.
   * @returns - Name from Index.
   */
  getName(index:number): string {
    return this.curLang == 'en' ? this.links[index].en : this.links[index].de;
  }

  /**
   * Sets the current language.
   * @param index - Index of Language
   */
  setCurLang(index:number):void {
    if (index < this.languages.length) {
      this.curLang = this.languages[index];
      this.saveLang();
    }
  }

  /** Seves current language in local storage. */
  saveLang():void {
  localStorage.setItem('curLang', this.curLang)
  }

  /**
   * Gets language from local storage.
   * @returns stored language.
   */
  getLang():string {
    const stored = localStorage.getItem('curLang');
    return stored ? stored : 'en';
  }

  /** Swichtes Overlay view and hide. */
  toggleOverlay() {
  this.overlayOpen = !this.overlayOpen
}
}
// #endregion