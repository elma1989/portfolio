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

    it('should openMenu() works', () => {
      component.openMenu();
      fixture.detectChanges();
      expect(component.menu()).toBeTrue();
    })

    it('should closeMenu() works', () => {
      component.closeMenu();
      fixture.detectChanges();
      expect(component.menu()).toBeFalse();
    })
  });

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

    it('should have overlow-x: hidden', () => {
      expect(content()?.classList.contains('overflow-x-hidden') ?? false).toBeTrue();
    });
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
      () => element.querySelector('.settings>.lang-sel');
    const menuBtn: () => HTMLButtonElement | null =
      () => element.querySelector('.settings>.menu-btn')
    
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

      translationServiceMock.lang = 'de'
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

    it('should have menu-btn', () => {
      expect(menuBtn()).toBeTruthy();
    });

    it('menu-btn should have 3 spans', () => {
      const spans: NodeListOf<HTMLSpanElement> = element.querySelectorAll('.menu-btn>span');
      expect(spans.length).toBe(3);
    });

    it('sould click on menu-btn', () => {
      menuBtn()?.click();
      fixture.detectChanges();
      expect(component.menu()).toBeTrue();
    });
  });

  describe('Menu-Overlay', () => {
    const getOverlay: () => HTMLElement | null =
      () => element.querySelector('menu-overlay');

    it('should not render on menu close', () => {
      component.menu.set(false);
      fixture.detectChanges();
      expect(getOverlay()).toBeNull();
    });

    it('should render on menu open', () => {
      component.menu.set(true);
      fixture.detectChanges();
      expect(getOverlay()).toBeTruthy();
    });

    beforeEach(() => {
      component.menu.set(true);
      fixture.detectChanges();
    })

    it('should have width 13rem', () => {
      expect(getOverlay()?.classList.contains('w-52') ?? false).toBeTrue();
    });

    it('should have direction column', () => {
      expect(getOverlay()?.classList.contains('flex') ?? false).toBeTrue();
      expect(getOverlay()?.classList.contains('flex-col') ?? false).toBeTrue();
    });

    it('should have white background', () => {
      expect(getOverlay()?.classList.contains('bg-cwhite') ?? false).toBeTrue();
    });

    it('should have position top-right', () => {
      expect(getOverlay()?.classList.contains('absolute') ?? false).toBeTrue();
      expect(getOverlay()?.classList.contains('top-0') ?? false).toBeTrue();
      expect(getOverlay()?.classList.contains('right-0') ?? false).toBeTrue();
    });

    it('should have position right 4.5rem on desktop', () => {
      expect(getOverlay()?.classList.contains('lg:right-18') ?? false).toBeTrue();
    });
  });
});
