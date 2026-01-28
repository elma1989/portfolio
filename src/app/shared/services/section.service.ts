import { HostListener, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { SectionType } from '../enums/section-type';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private _mobile: WritableSignal<boolean> = signal<boolean>(this.isMobile());
  private _section: WritableSignal<SectionType> = signal<SectionType>(SectionType.HERO);

  get mobile(): Signal<boolean> { return this._mobile.asReadonly() }

  set mobile(state: boolean) { this._mobile.set(state) }

  get section(): Signal<SectionType> { return this._section.asReadonly() }

  set section(section: SectionType) { this._section.set(section) }

  isMobile(): boolean {
    return window.innerWidth < 1024;
  }
}
