import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { SectionService } from '../../services/section.service';
import { SectionType } from '../../enums/section-type';
import { Signal, signal } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

const langSignal = signal<'en' | 'de'>('en');

const translationServiceMock = {
  get lang(): Signal<'en'|'de'> { return langSignal.asReadonly(); },
  set lang(lang: 'en'|'de') { langSignal.set(lang); }
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let element: HTMLElement;
  let sec: SectionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        {
          provide: TranslationService,
          useValue: translationServiceMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    sec = TestBed.inject(SectionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Methods', () => {
    it('should isSectionDark() works', () => {
      sec.section = SectionType.HERO;
      fixture.detectChanges();
      expect(component.isSectionDark()).toBeFalse();

      sec.section = SectionType.ABOUT;
      fixture.detectChanges();
      expect(component.isSectionDark()).toBeTrue();

      sec.section = SectionType.SKILLS;
      fixture.detectChanges();
      expect(component.isSectionDark()).toBeFalse();

      sec.section = SectionType.PROJECTS;
      fixture.detectChanges();
      expect(component.isSectionDark()).toBeTrue();

      sec.section = SectionType.REFERENCES;
      fixture.detectChanges();
      expect(component.isSectionDark()).toBeFalse();

      sec.section = SectionType.CONTACT;
      fixture.detectChanges();
      expect(component.isSectionDark()).toBeFalse();
    });

    it('should switchLang works', () => {
      translationServiceMock.lang = 'en';
      component.switchLang();
      fixture.detectChanges();
      expect(translationServiceMock.lang()).toBe('de');

      component.switchLang();
      fixture.detectChanges();
      expect(translationServiceMock.lang()).toBe('en');
    });
  })

  describe('Content', () => {
    const content: () => HTMLDivElement | null =
      () => element.querySelector('.content');
    
    it('should have content limiter', () => {
      expect(content()).toBeTruthy();
    });

    it('should have, x-space-between, y-center', () => {
      expect(content()?.classList.contains('flex') ?? false).toBeTrue();
      expect(content()?.classList.contains('justify-between') ?? false).toBeTrue();
      expect(content()?.classList.contains('items-center') ?? false).toBeTrue();
    });

    it('should have padding-x 1rem on mobile', () => {
      expect(content()?.classList.contains('px-4') ?? false).toBeTrue();
    });

    it('should have pedding-x 4.5rem on deskop', () => {
      expect(content()?.classList.contains('lg:px-18') ?? false).toBeTrue();
    });

    // it('should have social media on deskop in hero-section', () => {
    //   const social: () => HTMLElement | null =
    //     () => element.querySelector('social-media');
    //   (window as any).innerWidth = 672;
    //   window.dispatchEvent(new Event('resize'));
    //   fixture.detectChanges();
    //   expect(social()).toBeNull();

    //   (window as any).innerWidth = 1024;
    //   window.dispatchEvent(new Event('resize'));
    //   fixture.detectChanges();
    //   expect(social()).toBeTruthy();

    //   sec.section = SectionType.ABOUT;
    //   expect(social()).toBeNull();

    //   sec.section = SectionType.SKILLS;
    //   expect(social()).toBeNull();

    //   sec.section = SectionType.PROJECTS;
    //   expect(social()).toBeNull();

    //   sec.section = SectionType.REFERENCES;
    //   expect(social()).toBeNull();

    //   sec.section = SectionType.CONTACT;
    //   expect(social()).toBeNull();
    // });
  });

  describe('Logo-Area', () => {
    const area: () => HTMLDivElement | null =
      () => element.querySelector('.content>.logo-area');
    const img: () => HTMLImageElement | null =
      () => element.querySelector('.logo-area>img');

    it('should have logo-area', () => {
      expect(area()).toBeTruthy();
    });

    it('should have y-center', () => {
      expect(area()?.classList.contains('flex') ?? false).toBeTrue();
      expect(area()?.classList.contains('items-center') ?? false).toBeTrue();
    })

    it('should have font "TitanOne"', () => {
      expect(area()?.classList.contains('font-titanone') ?? false).toBeTrue();
    });

    it('should have font-size 1.5rem', () => {
      expect(area()?.classList.contains('text-[1.5rem]') ?? false).toBeTrue();
    });

    it('shoult content be "Elste"', () => {
      expect(area()?.textContent).toBe('Elste');
    });

    it('should have image', () => {
      expect(img()).toBeTruthy();
    });

    it('img should have height 2.5rem', () => {
      expect(img()?.classList.contains('h-10') ?? false).toBeTrue();
    });

    it('img should have margin-right 0.75rem', () => {
      expect(img()?.classList.contains('mr-3') ?? false).toBeTrue();
    });

    it('img should have corrrect source', () => {
      expect(img()?.src ?? '')
        .toBe('http://localhost:9876/assets/img/00_header/logo.svg');
    })

    it('should have dark text', () => {
      sec.section = SectionType.HERO;
      fixture.detectChanges();
      expect(area()?.classList.contains('tx-black') ?? false).toBeFalse();

      sec.section = SectionType.ABOUT;
      fixture.detectChanges();
      expect(area()?.classList.contains('tx-black') ?? false).toBeTrue();

      sec.section = SectionType.SKILLS;
      fixture.detectChanges();
      expect(area()?.classList.contains('tx-black') ?? false).toBeFalse();

      sec.section = SectionType.PROJECTS;
      fixture.detectChanges();
      expect(area()?.classList.contains('tx-black') ?? false).toBeTrue();

      sec.section = SectionType.REFERENCES;
      fixture.detectChanges();
      expect(area()?.classList.contains('tx-black') ?? false).toBeFalse();

      sec.section = SectionType.CONTACT;
      fixture.detectChanges();
      expect(area()?.classList.contains('tx-black') ?? false).toBeFalse();
    });
  });

  describe('Settings', () => {
    const settings: () => HTMLDivElement | null = 
      () => element.querySelector('.content>.settings');
    const langSelBtn: () => HTMLButtonElement | null =
      () => element.querySelector('.settings>.lang-sel')
    
    it('should exist' ,() => {
      expect(settings()).toBeTruthy();
    });

    it('should have gap 1rem', () => {
      expect(settings()?.classList.contains('flex') ?? false).toBeTrue();
      expect(settings()?.classList.contains('gap-4') ?? false).toBeTrue();
    });

    it('should have lang-sel-btn', () => {
      expect(langSelBtn()).toBeTruthy();
    });

    it('should have dark text', () => {
      sec.section =  SectionType.HERO;
      fixture.detectChanges();
      expect(langSelBtn()?.classList.contains('tx-black') ?? false).toBeFalse();

      sec.section =  SectionType.ABOUT;
      fixture.detectChanges();
      expect(langSelBtn()?.classList.contains('tx-black') ?? false).toBeTrue();

      sec.section =  SectionType.SKILLS;
      fixture.detectChanges();
      expect(langSelBtn()?.classList.contains('tx-black') ?? false).toBeFalse();

      sec.section =  SectionType.PROJECTS;
      fixture.detectChanges();
      expect(langSelBtn()?.classList.contains('tx-black') ?? false).toBeTrue();

      sec.section =  SectionType.REFERENCES;
      fixture.detectChanges();
      expect(langSelBtn()?.classList.contains('tx-black') ?? false).toBeFalse();

      sec.section =  SectionType.CONTACT;
      fixture.detectChanges();
      expect(langSelBtn()?.classList.contains('tx-black') ?? false).toBeFalse();
    });

    it('should have dark border', () => {
      sec.section =  SectionType.HERO;
      fixture.detectChanges();
      expect(langSelBtn()?.classList.contains('bd-black') ?? false).toBeFalse();

      sec.section =  SectionType.ABOUT;
      fixture.detectChanges();
      expect(langSelBtn()?.classList.contains('bd-black') ?? false).toBeTrue();

      sec.section =  SectionType.SKILLS;
      fixture.detectChanges();
      expect(langSelBtn()?.classList.contains('bd-black') ?? false).toBeFalse();

      sec.section =  SectionType.PROJECTS;
      fixture.detectChanges();
      expect(langSelBtn()?.classList.contains('bd-black') ?? false).toBeTrue();

      sec.section =  SectionType.REFERENCES;
      fixture.detectChanges();
      expect(langSelBtn()?.classList.contains('bd-black') ?? false).toBeFalse();

      sec.section =  SectionType.CONTACT;
      fixture.detectChanges();
      expect(langSelBtn()?.classList.contains('bd-black') ?? false).toBeFalse();
    })

    it('lang-sel-btn should have correct description', () => {
      translationServiceMock.lang = 'en'
      fixture.detectChanges();
      expect(langSelBtn()?.textContent ?? '').toBe('EN');

      translationServiceMock.lang = 'en'
      fixture.detectChanges();
      expect(langSelBtn()?.textContent ?? '').toBe('DE')
    });

    it('click on lang sel btn works', () => {
      translationServiceMock.lang = 'en'; 
      fixture.detectChanges();
      langSelBtn()?.click();
      fixture.detectChanges();
      expect(translationServiceMock.lang()).toBe('de')
    });
  });
});
