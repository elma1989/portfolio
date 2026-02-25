import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutSectionComponent } from './about-section.component';
import { Signal, signal } from '@angular/core';
import { MockTranslatePipe } from '../../shared/pipes/mock-translate.pipe';
import { TranslationService } from '../../shared/services/translation.service';
import { SectionService } from '../../shared/services/section.service';
import { SectionType } from '../../shared/enums/section-type';

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
  let sec: SectionService;

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
    sec = TestBed.inject(SectionService);
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
      () => element.querySelector('.content>.content-area');

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
        expect(elem.classList).toContain('lg:w-9/10');
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
        expect(elem.classList).toContain('lg:px-28');
        expect(elem.classList).toContain('lg:py-18');
      }
      expect(elem).toBeTruthy();
    });

    it('should have overflow y hidden', () => {
      expect(area()?.classList).toContain('overflow-y-hidden');
    })
  });

  describe('H1', () => {
    const h1: () => HTMLElement | null =
      () => element.querySelector('.content-area>h1');

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

    it('should have content "translated: about.title"', () => {
      expect(h1()?.textContent ?? '')
        .toBe('translated: about.title')
    });
  });

  describe('Portait', () => {
    const portrait: () => HTMLImageElement | null =
      () => element.querySelector('.content-area>div>.portrait')

    it('should have portrait', () => {
      expect(portrait()).toBeTruthy();
    });

    it('should have full-size', () => {
      expect(portrait()?.classList).toContain('w-full');
      expect(portrait()?.classList).toContain('h-full');
    });

    it('should source be correct', () => {
      expect(portrait()?.src ?? '')
        .toBe('http://localhost:9876/assets/img/02_about/me-orange.png');
    });
  });

  describe('Description', () => {
    const desc: () => HTMLDivElement | null =
      () => element.querySelector('.content-area>.desc-area');

    it('should exist desc-area', () => {
      expect(desc()).toBeTruthy();
    });

    it('should have position absolute', () => {
      expect(desc()?.classList).toContain('absolute');
    });

    it('should have background black', () => {
      expect(desc()?.classList).toContain('bg-cblack');
    });

    it('should have white text', () => {
      expect(desc()?.classList).toContain('tx-white');
    })

    it('should have padding 1rem on Mobile', () => {
      expect(desc()?.classList).toContain('p-4');
    });

    it('should have padding 2rem on Desktop', () => {
      expect(desc()?.classList).toContain('lg:p-8');
    });

    it('should have gap 1rem column on Mobile', () => {
      expect(desc()?.classList).toContain('flex');
      expect(desc()?.classList).toContain('flex-col');
      expect(desc()?.classList).toContain('gap-4');
    });

    it('should have gap 2 rem on Desktop', () => {
      expect(desc()?.classList).toContain('lg:gap-8');
    })
  });

  describe('Paragraphs in desc', () => {
    const ps: () => NodeListOf<HTMLParagraphElement> =
      () => element.querySelectorAll('.desc-area>p');

    it('should have 2 paragraphs', () => {
      expect(ps().length).toBe(2);
    });

    it('should have text justify and auto hyphens on Desktop', () => {
      ps().forEach(p => {
        expect(p.classList).toContain('hyphens-auto');
        expect(p.classList).toContain('lg:text-justify');
      });
    });

    it('should first paragraph have content "translated: about.p1"', () => {
      expect(ps()[0]?.textContent ?? '')
        .toBe('translated: about.p1');
    });

    it('should secound paragraph have content "translated: about.p2"', () => {
      expect(ps()[1]?.textContent ?? '')
        .toBe('translated: about.p2');
    })
  });

  describe('Footer in desc', () => {
    const footer: () => HTMLElement | null =
      () => element.querySelector('.desc-area>footer');

    it('should have a footer', () => {
      expect(footer()).toBeTruthy();
    });

    it('should have x space between and y center', () => {
      const ft: HTMLElement | null = footer();
      expect(ft?.classList).toContain('flex');
      expect(ft?.classList).toContain('justify-between');
      expect(ft?.classList).toContain('items-center');
    });
  });

  describe('buttons in footer', () => {
    const btns: () => NodeListOf<HTMLButtonElement> =
      () => element.querySelectorAll('.desc-area button');
    const img: () => HTMLImageElement | null =
      () => element.querySelector('.smile>img');

    it('should have 2 buttons', () => {
      expect(btns().length).toBe(2);
    });

    it('1st btn should be default', () => {
      expect(btns()[0]?.classList).toContain('btn-default');
    });

    it('1st btn should have content "about.contact-btn"', () => {
      expect(btns()[0]?.textContent ?? '')
        .toBe('translated: about.contact-btn');
    });

    it('should go to contact on click 1st button', () => {
      btns()[0]?.click();
      fixture.detectChanges();
      expect(sec.section()).toBe(SectionType.CONTACT)
    });

    it('2nd button should have class "smile"', () => {
      expect(btns()[1]?.classList).toContain('smile')
    });

    it('2nd button should have size 2rem', () => {
      expect(btns()[1]?.classList).toContain('size-8');
    });

    it('2nd button should have an image', () => {
      expect(img()).toBeTruthy();
    });

    it('button image should have full size', () => {
      const btnimg: HTMLImageElement | null = img();
      expect(btnimg?.classList).toContain('w-full');
      expect(btnimg?.classList).toContain('h-full');
    });

    it('button image source should be correct', () => {
      expect(img()?.src)
        .toBe('http://localhost:9876/assets/img/02_about/smile.png')
    });
  });

  describe('Section Selector', () => {
    const sel: () => HTMLElement | null =
      () => element.querySelector('.content>section-selector');

    it('should not render on mobile', () => {
      sec.mobile = true;
      fixture.detectChanges();
      expect(sel()).toBeNull();
    });

    describe('Desktop', () => {
      beforeEach(() => {
        sec.mobile = false;
        fixture.detectChanges();
      });

      it('should render', () => {
        expect(sel()).toBeTruthy();
      });

      it('should have all content center', () => {
        const elem: HTMLElement | null = sel();
        expect(elem?.classList).toContain('flex');
        expect(elem?.classList).toContain('justify-center');
        expect(elem?.classList).toContain('items-center');
      });
    });
  });

  describe('About Overlay', () => {
    const overlay: () => HTMLElement | null =
      () => element.querySelector('about-overlay');

    it('should render on open', () => {
      expect(overlay()).toBeTruthy();
    });

    it('should have class open if open', () => {
      const elem: HTMLElement | null = overlay();

      component.openOvelay();
      fixture.detectChanges();
      expect(elem?.classList).toContain('open');

      component.closeOverlay();
      fixture.detectChanges();
      expect(elem?.classList).not.toContain('open');
    });

    it('should have with 17rem', () => {
      expect(overlay()?.classList).toContain('w-68');
    });

    it('should have blue background', () => {
      expect(overlay()?.classList).toContain('bg-blue');
    });

    it('should have white text', () => {
      expect(overlay()?.classList).toContain('tx-white');
    });

    it('should have posittion bottom left corner mobile', () => {
      const elem: HTMLElement | null = overlay();
      expect(elem?.classList).toContain('absolute');
      expect(elem?.classList).toContain('bottom-0');
      expect(elem?.classList).toContain('left-0');
    });

    it('should have posittion bottom right corner desktop', () => {
      const elem: HTMLElement | null = overlay();
      expect(elem?.classList).toContain('lg:right-0');
      expect(elem?.classList).toContain('lg:left-auto');
    });

    it('should have padding 1rem on mobile', () => {
      expect(overlay()?.classList).toContain('p-4');
    });

    it('should have padding 2rem on desktop', () => {
      expect(overlay()?.classList).toContain('lg:p-8');
    });

    it('should have dirction column, gap 1rem', () => {
      const elem: HTMLElement | null = overlay();
      expect(elem?.classList).toContain('flex');
      expect(elem?.classList).toContain('flex-col');
      expect(elem?.classList).toContain('gap-4');
    });

  });
});
