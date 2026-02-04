import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactSectionComponent } from './contact-section.component';
import { Signal, signal } from '@angular/core';
import { TranslationService } from '../../shared/services/translation.service';

const langSignal = signal<'en' | 'de'>('en');

const translationServiceMock = {
  get lang(): Signal<'en' | 'de'> { return langSignal.asReadonly(); },
  set lang(lang: 'en' | 'de') { langSignal.set(lang); },
  translate: (key: string) => `translated: ${key}`
};

describe('ContactSectionComponent', () => {
  let component: ContactSectionComponent;
  let fixture: ComponentFixture<ContactSectionComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactSectionComponent],
      providers: [
        {
          provide: TranslationService,
          useValue: translationServiceMock
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContactSectionComponent);
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

    it('should be flex-box', () => {
      expect(content()?.classList).toContain('flex');
    });
  });

  describe('Content-Area', () => {
    const area: () => HTMLDivElement | null =
      () => element.querySelector('.content>.content-area');

    it('should have content-area', () => {
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

    it('should have padding 1rem om mobile', () => {
      expect(area()?.classList).toContain('p-4');
    });

    it('should have padding 2 0 0 7 on desktop', () => {
      const a = area();
      expect(a?.classList).toContain('lg:pt-8');
      expect(a?.classList).toContain('lg:pr-0');
      expect(a?.classList).toContain('lg:pb-0');
      expect(a?.classList).toContain('lg:pl-28');
    });

    it('should have gap 2rem column on mobile', () => {
      const a = area();
      expect(a?.classList).toContain('flex');
      expect(a?.classList).toContain('flex-col');
      expect(a?.classList).toContain('gap-8');
    });

    it('should have dirction row on desktop', () => {
      expect(area()?.classList).toContain('lg:flex-row');
    });
  });

  describe('Header', () => {
    const header: () => HTMLElement | null =
      () => element.querySelector('.content-area>header');

    it('should have header', () => {
      expect(header()).toBeTruthy();
    });

    it('should have full width on mobile', () => {
      expect(header()?.classList).toContain('w-full');
    });

    it('should have 1/2 width on desktop', () => {
      expect(header()?.classList).toContain('lg:w-1/2');
    });

    it('should have full height on desktop', () => {
      expect(header()?.classList).toContain('lg:h-full');
    });

    it('should have gap 2rem column', () => {
      const head = header();
      expect(head?.classList).toContain('flex');
      expect(head?.classList).toContain('flex-col');
      expect(head?.classList).toContain('gap-8');
    });

    it('should have gap 4rem on desktop', () => {
      expect(header()?.classList).toContain('lg:gap-16');
    });
  });
});
