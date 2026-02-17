import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReferencesSectionComponent } from './references-section.component';
import { Signal, signal } from '@angular/core';
import { TranslationService } from '../../shared/services/translation.service';
import { SectionService } from '../../shared/services/section.service';
import { SectionSelectorComponent } from '../../shared/components/section-selector/section-selector.component';
import { By } from '@angular/platform-browser';

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
  let sec: SectionService;

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

    it('should have full width', () => {
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

  describe('Ref-Container', () => {
    const refConteiner: () => HTMLDivElement | null =
      () => element.querySelector('.ref-area>.ref-container');

    it('should have ref-container', () => {
      expect(refConteiner()).toBeTruthy();
    });

    it('should have full width on mobile', () => {
      expect(refConteiner()?.classList).toContain('w-full');
    });

    it('should have width 1/3 on desktop', () => {
      expect(refConteiner()?.classList).toContain('lg:w-2/3');
    });

    it('should have full height on desktop', () => {
      expect(refConteiner()?.classList).toContain('lg:h-full');
    });
  });

  describe('Single Ref', () => {
    const reference: () => HTMLDivElement | null =
      () => element.querySelector('.ref-container>.reference');

    it('should have reference', () => {
      expect(reference()).toBeTruthy();
    });

    it('should have rounded corners', () => {
      expect(reference()?.classList).toContain('rounded-sm');
    })

    it('should have full width', () => {
      expect(reference()?.classList).toContain('w-full');
    });

    it('should have padding 1rem on mobile', () => {
      expect(reference()?.classList).toContain('p-4');
    });

    it('should have padding 2rem on desktop', () => {
      expect(reference()?.classList).toContain('lg:p-8');
    });

    it('should have gap 1rem column', () => {
      const ref = reference();
      expect(ref?.classList).toContain('flex');
      expect(ref?.classList).toContain('flex-col');
      expect(ref?.classList).toContain('gap-4');
    });
  });

  describe('Single Ref Name', () => {
    const name: () => HTMLElement | null =
      () => element.querySelector('.reference>h2');

    it('shoulde have name', () => {
      expect(name()).toBeTruthy();
    });

    it('should be bold text', () => {
      expect(name()?.classList).toContain('font-bold');
    });

    it('should have padding-y 0.5rem', () => {
      expect(name()?.classList).toContain('py-2');
    });

    it('should have font-size 1.5rem', () => {
      expect(name()?.classList).toContain('text-[1.5rem]/[1.5rem]');
    });

    it('schould have full name as content', () => {
      expect(name()?.textContent)
        .toBe(component.reference.fullName);
    });
  });

  describe('Single Ref Paragraphs', () => {
    const paragraphs: () => NodeListOf<HTMLParagraphElement> =
      () => element.querySelectorAll('.reference>p');

    it('should have 2 paragraphs', () => {
      expect(paragraphs().length).toBe(2);
    });

    it('first paragraph should have content "translated: references.marcus', () => {
      expect(paragraphs()[0]?.textContent)
        .toBe('translated: references.marcus');
    });

    it('second paragraph should be bold', () => {
      expect(paragraphs()[1]?.classList).toContain('font-bold');
    });

    it('second paragraph should have content positon of reference', () => {
      expect(paragraphs()[1]?.textContent)
        .toBe(component.reference.position);
    });
  });

  describe('SectionSelector', () => {
    const selector: () => HTMLElement | null =
      () => element.querySelector('.content>section-selector');

    it('should not have SectionSelector on mobile', () => {
      sec.mobile = true;
      fixture.detectChanges();
      expect(selector()).toBeNull();
    });

    describe('Mobile', () => {
      beforeEach(() => {
        sec.mobile = false;
      fixture.detectChanges();
      });

      it('should have SectionSelector on desktop', () => {
        expect(selector()).toBeTruthy();
      });

      it('should have width 10%', () => {
        expect(selector()?.classList).toContain('w-1/10');
      });

      it('should have centered conentent', () => {
        const select = selector();
        expect(select?.classList).toContain('flex');
        expect(select?.classList).toContain('justify-center');
        expect(select?.classList).toContain('items-center');
      });

      it('should have index = 2', () => {
        const selectorCom: SectionSelectorComponent = fixture
          .debugElement
          .query(By.directive(SectionSelectorComponent))
          .componentInstance;

        expect(selectorCom.index()).toBe(4);
      });
    });
  });
});
