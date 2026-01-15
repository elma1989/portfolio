import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutOverlayComponent } from './about-overlay.component';
import { Signal, signal } from '@angular/core';
import { TranslationService } from '../../../shared/services/translation.service';
import { SectionService } from '../../../shared/services/section.service';

const langSignal = signal<'en' | 'de'>('en');

const translationServiceMock = {
  get lang(): Signal<'en' | 'de'> { return langSignal.asReadonly(); },
  set lang(lang: 'en' | 'de') { langSignal.set(lang); },
  translate: (key: string) => `translated: ${key}`
};

describe('AboutOverlayComponent', () => {
  let component: AboutOverlayComponent;
  let fixture: ComponentFixture<AboutOverlayComponent>;
  let element: HTMLElement;
  let sec: SectionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutOverlayComponent],
      providers: [
        {
          provide: TranslationService,
          useValue: translationServiceMock
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AboutOverlayComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    sec = TestBed.inject(SectionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Header', () => {
    const header: () => HTMLElement | null =
      () => element.querySelector('header');

    it('should have header', () => {
      expect(header()).toBeTruthy();
    });

    it('should have full width', () => {
      expect(header()?.classList).toContain('w-full');
    });

    it('should be space between on mobile', () => {
      const elem: HTMLElement | null = header();
      expect(elem?.classList).toContain('flex');
      expect(elem?.classList).toContain('justify-between');
      expect(elem?.classList).toContain('items-center');
    });

    it('should be center on desktp', () => {
      expect(header()?.classList).toContain('lg:justify-center');
    });

    it('should have bold text', () => {
      expect(header()?.classList).toContain('text-bold')
    });
  });

  describe('H2', () => {
    const h2: () => HTMLElement | null =
      () => element.querySelector('header>h2');

    it('should have h2', () => {
      expect(h2()).toBeTruthy();
    });

    it('should have size 1.5rem', () => {
      expect(h2()?.classList).toContain('text-[1.5rem]/[1.5rem]');
    });

    it('should have content "about.overlay-title', () => {
      expect(h2()?.textContent ?? '')
        .toBe('translated: about.overlay-title');
    });
  });

  describe('Close btn', () => {
    const close: () => HTMLButtonElement | null =
      () => element.querySelector('header>button');
    
    it('should not render on desktop', () => {
      sec.mobile = false;
      fixture.detectChanges();
      expect(close()).toBeNull();
    });

    describe('Mobile', () => {
      beforeEach(() => {
        sec.mobile = true;
        fixture.detectChanges();
      });

      it('should reder on mobile', () => {
        expect(close()).toBeTruthy();
      });

      it('should have size 2rem', () => {
        const elem: HTMLButtonElement | null = close();
        expect(elem?.classList).toContain('w-8');
        expect(elem?.classList).toContain('h-8');
      });

      it('should have content center', () => {
        const elem: HTMLButtonElement | null = close();
        expect(elem?.classList).toContain('flex');
        expect(elem?.classList).toContain('justify-center');
        expect(elem?.classList).toContain('items-center');
      });

      it('should have content "X"', () => {
        expect(close()?.textContent ?? '').toBe('X');
      });
    });
  });
});
