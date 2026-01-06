import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

type Lang = 'en' | 'de';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  _lang: WritableSignal<Lang> = signal<Lang>('en');

  get lang(): Signal<Lang> { return this._lang.asReadonly(); }

  set lang(lang: Lang) { this._lang.set(lang); }

  translate(key: string): string {
    return ''
  }

}
