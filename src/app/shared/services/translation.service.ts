import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';

type Lang = 'en' | 'de';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly http: HttpClient;
  private readonly _lang: WritableSignal<Lang> = signal<Lang>('en');
  private readonly translations: WritableSignal<Record<string, any>> = signal({});
  private readonly cache = new Map<Lang, Record<string, any>>();

  constructor() {
    this.http  = inject(HttpClient);

    effect(() => {
      const lang = this.lang();
      if(this.cache.has(lang)) {
        this.translations.set(this.cache.get(lang)!);
        return;
      }

      this.http
        .get(`assets/i18n/${lang}.json`)
        .subscribe(data => {
          const dict = data ?? {};
          this.cache.set(lang, dict);
          this.translations.set(dict);
        })
    })
  }

  get lang(): Signal<Lang> { return this._lang.asReadonly(); }

  set lang(lang: Lang) { this._lang.set(lang); }

  translate(key: string): string {
    const value: string = key
      .split('.')
      .reduce<any>((acc, part) => acc?.[part], this.translations());
    return typeof value == 'string' ? value : key
  }

}
