import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReferencesSectionComponent } from './references-section.component';
import { Signal, signal } from '@angular/core';
import { TranslationService } from '../../shared/services/translation.service';

const langSignal = signal<'en' | 'de'>('en');

const translationServiceMock = {
  get lang(): Signal<'en' | 'de'> { return langSignal.asReadonly(); },
  set lang(lang: 'en' | 'de') { langSignal.set(lang); },
  translate: (key: string) => `translated: ${key}`
};

describe('ReferencesSectionComponent', () => {
  let component: ReferencesSectionComponent;
  let fixture: ComponentFixture<ReferencesSectionComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferencesSectionComponent],
      providers: [
        {
          provide: TranslationService,
          useValue: translationServiceMock
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReferencesSectionComponent);
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

    it('should have content-limiter', () => {
      expect(content()).toBeTruthy();
    });

    it('should be a flex-box', () => {
      expect(content()?.classList).toContain('flex')
    });
  });

  describe('Content-Area', () => {
    const area: () => HTMLDivElement | null =
      () => element.querySelector('.content>.content-area');

    it('should have content area', () => {
      expect(area()).toBeTruthy();
    });

    it('should have full height', () => {
      expect(area()?.classList).toContain('h-full');
    });

    it('should have full width on mobile', () => {
      expect(area()?.classList).toContain('w-full');
    });

    it('should have 90% width on desktop', () => {
      expect(area()?.classList).toContain('lg:w-9/10');
    });

    it('should have padding 1rem on mobile', () => {
      expect(area()?.classList).toContain('p-4');
    });

    it('should have padding 2 0 2 7 on desktop', () => {
      const ar = area();
      expect(ar?.classList).toContain('lg:py-8');
      expect(ar?.classList).toContain('lg:pr-0');
      expect(ar?.classList).toContain('lg:pl-28');
    });

    it('should have gap 2rem column', () => {
      const ar = area();
      expect(ar?.classList).toContain('flex');
      expect(ar?.classList).toContain('flex-col');
      expect(ar?.classList).toContain('gap-8');
    });
  });

  describe('Title', () => {
    const title: () => HTMLElement | null =
      () => element.querySelector('.content-area>h1');

    it('should have title', () => {
      expect(title()).toBeTruthy();
    });

    it('should have font "Eczar"', () => {
      expect(title()?.classList).toContain('font-eczar');
    });

    it('should have line-break', () => {
      const h1 = title();
      expect(h1?.classList).toContain('whitespace-normal');
      expect(h1?.classList).toContain('wrap-break-word');
    });

    it('should be bold', () => {
      expect(title()?.classList).toContain('font-bold');
    })

    it('should have font-size 2rem on mobile', () => {
      expect(title()?.classList).toContain('text-[2rem]/[2rem]');
    });

    it('should have font-size 4.5rem on desktop', () => {
      expect(title()?.classList).toContain('lg:text-[4.5rem]/[4.5rem]');
    });

    it('should have content "translated: references.title"', () => {
      expect(title()?.textContent)
        .toBe('translated: references.title');
    });
  });

  describe('Ref-Area', () => {
    const area: () => HTMLDivElement | null =
      () => element.querySelector('.content-area>.ref-area');

    it('should have ref-area', () => {
      expect(area()).toBeTruthy();
    });

    it('should have full width',  () => {
      expect(area()?.classList).toContain('w-full');
    });

    it('shouold have the rest of height', () => {
      expect(area()?.classList).toContain('flex-1');
    });

    it('should have gap 2rem column', () => {
      const ar = area();
      expect(ar?.classList).toContain('flex');
      expect(ar?.classList).toContain('flex-col');
      expect(ar?.classList).toContain('gap-8');
    });

    it('should have direction row on desktop', () => {
      expect(area()?.classList).toContain('lg:flex-row');
    });
  });
});
