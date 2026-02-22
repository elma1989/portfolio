import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactSectionComponent } from './contact-section.component';
import { Signal, signal } from '@angular/core';
import { TranslationService } from '../../shared/services/translation.service';
import { SectionService } from '../../shared/services/section.service';
import { By } from '@angular/platform-browser';
import { SectionSelectorComponent } from '../../shared/components/section-selector/section-selector.component';
import { provideRouter } from '@angular/router';

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
  let sec: SectionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactSectionComponent],
      providers: [
        {
          provide: TranslationService,
          useValue: translationServiceMock
        },
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContactSectionComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    sec = TestBed.inject(SectionService);
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

  describe('H1', () => {
    const title: () => HTMLElement | null =
      () => element.querySelector('header>h1');

    it('should have h1', () => {
      expect(title()).toBeTruthy();
    });

    it('should have font "Eczar"', () => {
      expect(title()?.classList).toContain('font-eczar');
    });

    it('should have color yellow', () => {
      expect(title()?.classList).toContain('tx-yellow');
    });

    it('should have size 2.5rem on mobile', () => {
      expect(title()?.classList).toContain('text-[2.5rem]/[2.5rem]');
    });

    it('should have size 4.5rem on desktop', () => {
      expect(title()?.classList).toContain('lg:text-[4.5rem]/[4.5rem]');
    });

    it('should have content "translated: contact.title"', () => {
      expect(title()?.textContent)
        .toBe('translated: contact.title');
    })
  });

  describe('Description', () => {
    const desc: () => HTMLDivElement | null =
      () => element.querySelector('header>.desc');

    it('should have desc', () => {
      expect(desc()).toBeTruthy();
    });

    it('should have full width', () => {
      expect(desc()?.classList).toContain('w-full');
    });

    it('should have gap 1rem column', () => {
      const d = desc();
      expect(d?.classList).toContain('flex');
      expect(d?.classList).toContain('flex-col');
      expect(d?.classList).toContain('gap-4');
    });
  });

  describe('H2', () => {
    const subtitle: () => HTMLElement | null =
      () => element.querySelector('.desc>h2');

    it('should have h2', () => {
      expect(subtitle()).toBeTruthy();
    });

    it('should have color orange', () => {
      expect(subtitle()?.classList).toContain('tx-orange');
    });

    it('should have bold text', () => {
      expect(subtitle()?.classList).toContain('font-bold');
    });

    it('should have size 1.5rem', () => {
      expect(subtitle()?.classList).toContain('text-[1.5rem]/[1.5rem]');
    });

    it('should have content "translated: contact.h2"', () => {
      expect(subtitle()?.textContent)
        .toBe('translated: contact.h2');
    });
  });

  describe('Desc.p', () => {
    const paragraph: () => HTMLParagraphElement | null =
      () => element.querySelector('.desc>p');

    it('should have paragrah', () => {
      expect(paragraph()).toBeTruthy();
    });

    it('should have content "contact.header-p"', () => {
      expect(paragraph()?.textContent)
        .toBe('translated: contact.header-p');
    });
  });

  describe('Section Selector', () => {
    const selector: () => HTMLElement | null =
      () => element.querySelector('.content>section-selector');

    it('should not render selector on mobile', () => {
      sec.mobile = true;
      fixture.detectChanges();
      expect(selector()).toBeNull();
    });

    describe('Desktop', () => {
      beforeEach(() => {
        sec.mobile = false;
        fixture.detectChanges();
      });

      it('should render', () => {
        expect(selector()).toBeTruthy();
      });

      it('should have width 10%', () => {
        expect(selector()?.classList).toContain('w-1/10');
      });

      it('should have content center', () => {
        const sel = selector();
        expect(sel?.classList).toContain('flex');
        expect(sel?.classList).toContain('justify-center');
        expect(sel?.classList).toContain('items-center');
      });

      it('should be index=5', () => {
        const selComp = fixture.debugElement
          .query(By.directive(SectionSelectorComponent))
          .componentInstance;
        expect(selComp.index()).toBe(5);
      });
    });
  });
});
