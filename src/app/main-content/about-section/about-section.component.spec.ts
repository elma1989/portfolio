import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutSectionComponent } from './about-section.component';
import { Signal, signal } from '@angular/core';
import { MockTranslatePipe } from '../../shared/pipes/mock-translate.pipe';
import { TranslationService } from '../../shared/services/translation.service';

const langSignal = signal<'en' | 'de'>('en');

const translationServiceMock = {
  get lang(): Signal<'en' | 'de'> { return langSignal.asReadonly(); },
  set lang(lang: 'en' | 'de') { langSignal.set(lang); },
  translate: (key: string) => `translated: ${key}`
};

describe('AboutSectionComponent', () => {
  let component: AboutSectionComponent;
  let fixture: ComponentFixture<AboutSectionComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AboutSectionComponent,
        MockTranslatePipe
      ],
      providers: [
        {
          provide: TranslationService,
          useValue: translationServiceMock
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AboutSectionComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Content', () => {
    const content: () => HTMLDivElement | null =
      () => element.querySelector('.content');

    it('should have content limiter', () => {
      expect(content()).toBeTruthy();
    });

    it('shhould be flex-box', () => {
      const elem: HTMLElement | null = content();
      if (elem) {
        expect(elem.classList).toContain('flex');
      }
      expect(elem).toBeTruthy();
    });
  });

  describe('content-area', () => {
    const area: () => HTMLDivElement | null =
      () => element.querySelector('.content>.contentarea');

    it('should have content-area', () => {
      expect(area()).toBeTruthy();
    });

    it('should have full height', () => {
      const elem: HTMLDivElement | null = area();
      if (elem) {
        expect(elem.classList).toContain('h-full');
      }
      expect(elem).toBeTruthy();
    });

    it('should have full width on mobile', () => {
      const elem: HTMLDivElement | null = area();
      if (elem) {
        expect(elem.classList).toContain('w-full');
      }
      expect(elem).toBeTruthy();
    });

    it('should have 90% width on desktop', () => {
      const elem: HTMLDivElement | null = area();
      if (elem) {
        expect(elem.classList).toContain('lg:h-9/10');
      }
      expect(elem).toBeTruthy();
    });

    it('should have position relative', () => {
      const elem: HTMLDivElement | null = area();
      if (elem) {
        expect(elem.classList).toContain('relative');
      }
      expect(elem).toBeTruthy();
    });

    it('should have padding 1rem on mobile', () => {
      const elem: HTMLDivElement | null = area();
      if (elem) {
        expect(elem.classList).toContain('p-4');
      }
      expect(elem).toBeTruthy();
    });

    it('should have padding 4.5 7 4.5 7 on desktop', () => {
      const elem: HTMLDivElement | null = area();
      if (elem) {
        expect(elem.classList).toContain('px-28');
        expect(elem.classList).toContain('py-18');
      }
      expect(elem).toBeTruthy();
    });
  });

  describe('H1', () => {
    const h1: () => HTMLElement | null =
      () => element.querySelector('content-area>h1');

    it('should have h1', () => {
      expect(h1()).toBeTruthy();
    });

    it('should have right-align', () => {
      const elem: HTMLElement | null = h1();
      if (elem) {
        expect(elem.classList).toContain('text-right');
      }
      expect(elem).toBeTruthy();
    });

    it('should have font "Eczar"', () => {
      const elem: HTMLElement | null = h1();
      if (elem) {
        expect(elem.classList).toContain('font-eczar');
      }
      expect(elem).toBeTruthy();
    });

    it('should have font-size 2.5 on Mobile', () => {
      const elem: HTMLElement | null = h1();
      if (elem) {
        expect(elem.classList).toContain('text-[2.5rem]/[2.5rem]');
      }
      expect(elem).toBeTruthy();
    });

    it('should have font-size 4.5rem on Desktop', () => {
      const elem: HTMLElement | null = h1();
      if (elem) {
        expect(elem.classList).toContain('lg:text-[4.5rem]/[4.5rem]');
      }
      expect(elem).toBeTruthy();
    });

    it('should be bold font', () => {
      const elem: HTMLElement | null = h1();
      if (elem) {
        expect(elem.classList).toContain('font-bold');
      }
      expect(elem).toBeTruthy();
    });

    it('should have content "translated: about.title"', () => {
      expect(h1()?.textContent ?? '')
        .toBe('translated: about.title')
    });
  });

  describe('Portait', () => {
    const portrait: () => HTMLImageElement | null =
      () => element.querySelector('.content-area>.portait')

    it('should have portrait', () => {
      expect(portrait()).toBeTruthy();
    });

    it('should have width 30% on mobile', () => {
      expect(portrait()?.classList).toContain('w-3/10')
    });

    it('should have width 40% on desktop', () => {
      expect(portrait()?.classList).toContain('w-2/5');
    });

    it('should have position left 1rem top 5rem on mobile', () => {
      expect(portrait()?.classList).toContain('absolute');
      expect(portrait()?.classList).toContain('top-20');
      expect(portrait()?.classList).toContain('left-4');
    });

    it('should have position bottom 0 left 7rem', () => {
      expect(portrait()?.classList).toContain('lg:top-auto');
      expect(portrait()?.classList).toContain('lg:left-28');
      expect(portrait()?.classList).toContain('lg:bottom-0');
    });

    it('should source be correct', () => {
      expect(portrait()?.src ?? '')
        .toBe('http://localhost:9876/assets/img/02_about/me-orange.png');
    });
  });
});
