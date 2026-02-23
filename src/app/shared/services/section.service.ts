import { HostListener, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { SectionType } from '../enums/section-type';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private _mobile: WritableSignal<boolean> = signal<boolean>(false);
  private _section: WritableSignal<SectionType> = signal<SectionType>(SectionType.HERO);

  // #region Methods
  get mobile(): Signal<boolean> { return this._mobile.asReadonly() }

  set mobile(state: boolean) { this._mobile.set(state) }

  get section(): Signal<SectionType> { return this._section.asReadonly() }

  set section(section: SectionType) { 
    this._section.set(section);
    this.saveSection();
  }

  // #region Storage
  /** Saves the current section in local storage. */
  saveSection(): void {
    localStorage.setItem('section', this.section());
  }

  /** Loads section form local storage. */
  loadSection(): void {
    const storage = localStorage.getItem('section');
    if (storage) this._section.set(storage as SectionType);
  }
  // #endregion
  // #endregion
}
