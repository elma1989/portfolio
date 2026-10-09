import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsSectionComponent } from './projects-section.component';
import { ElementRef, Signal, signal } from '@angular/core';
import { TranslationService } from '../../shared/services/translation.service';
import { SectionService } from '../../shared/services/section.service';
import { By } from '@angular/platform-browser';
import { SectionSelectorComponent } from '../../shared/components/section-selector/section-selector.component';

const langSignal = signal<'en' | 'de'>('en');

const translationServiceMock = {
  get lang(): Signal<'en' | 'de'> { return langSignal.asReadonly(); },
  set lang(lang: 'en' | 'de') { langSignal.set(lang); },
  translate: (key: string) => `translated: ${key}`
};

describe('ProjectsSectionComponent', () => {
  let component: ProjectsSectionComponent;
  let fixture: ComponentFixture<ProjectsSectionComponent>;
  let element: HTMLElement;
  let sec: SectionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsSectionComponent],
      providers: [
        {
          provide: TranslationService,
          useValue: translationServiceMock
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectsSectionComponent);
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

    it('should have conent-limiter', () => {
      expect(content()).toBeTruthy();
    });

    it('should be Flex-box', () => {
      expect(content()?.classList).toContain('flex');
    });
  });

  describe('Content-Area', () => {
    const area: () => HTMLDivElement | null =
      () => element.querySelector('.content>.content-area');

    it('should have Content-Area', () => {
      expect(area()).toBeTruthy();
    });

    it('should have full height', () => {
      expect(area()?.classList).toContain('h-full');
    });

    it('should have full width on mobile', () => {
      expect(area()?.classList).toContain('w-full');
    });

    it('should have 90% width on mobile', () => {
      expect(area()?.classList).toContain('lg:w-9/10');
    });

    it('should have padding 1rem on mobile', () => {
      expect(area()?.classList).toContain('p-4');
    });

    it('should have gap 2rem column', () => {
      expect(area()?.classList).toContain('flex');
      expect(area()?.classList).toContain('flex-col');
      expect(area()?.classList).toContain('gap-8');
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

    it('should have height 7rem on desktop', () => {
      expect(header()?.classList).toContain('lg:h-28');
    });

    it('should have gap 2rem column', () => {
      const headerE = header();
      expect(headerE?.classList).toContain('flex');
      expect(headerE?.classList).toContain('flex-col');
      expect(headerE?.classList).toContain('gap-8');
    });

    it('should have direction row, y-center on Mobile', () => {
      const headerE = header();
      expect(headerE?.classList).toContain('lg:flex-row');
      expect(headerE?.classList).toContain('lg:items-center');
    });
  });

  describe('Title, Description', () => {
    const title: () => HTMLElement | null =
      () => element.querySelector('header>h1');
    const desc: () => HTMLParagraphElement | null =
      () => element.querySelector('header>p');

    it('should have title', () => {
      expect(title()).toBeTruthy();
    });

    it('title should have font "Eczar"', () => {
      expect(title()?.classList).toContain('font-eczar');
    });

    it('title should have size 2.5rem on mobile', () => {
      expect(title()?.classList).toContain('text-[2.5rem]/[2.5rem]');
    })

    it('title should have size 4.5rem on deskop', () => {
      expect(title()?.classList).toContain('lg:text-[4.5rem]/[4.5rem]');
    });

    it('title should have content "translated: projects.title"', () => {
      expect(title()?.textContent)
        .toBe('translated: projects.title');
    });

    it('should have Description', () => {
      expect(desc()).toBeTruthy();
    });

    it('desc should grow on desktop', () => {
      expect(desc()?.classList).toContain('lg:flex-1');
    });

    it('desc should have x-padding 2rem on desktop', () => {
      expect(desc()?.classList).toContain('lg:px-8');
    });

    it('desc should have content "translated: projects.desc"', () => {
      expect(desc()?.textContent)
        .toBe('translated: projects.desc');
    });
  });

  describe('Projects Area', () => {
    const projectsArea: () => HTMLDivElement | null =
      () => element.querySelector('.content-area>.projects-area');

    it('should have projects-area', () => {
      expect(projectsArea()).toBeTruthy();
    });

    it('should have gap 2em column', () => {
      const area = projectsArea();
      expect(area?.classList).toContain('flex');
      expect(area?.classList).toContain('flex-col');
      expect(area?.classList).toContain('gap-8');
    });
  });

  describe('Preview', () => {
    const preview: () => HTMLDivElement | null =
      () => element.querySelector('.projects-area>.preview');

    it('should have preview', () => {
      expect(preview()).toBeTruthy();
    });

    it('should have round corners', () => {
      expect(preview()?.classList).toContain('rounded-sm');
    });

    it('should have full width on mobile', () => {
      expect(preview()?.classList).toContain('w-full');
    });

    it('should be square', () => {
      expect(preview()?.classList).toContain('aspect-square');
    });

    it('should have center content', () => {
      const prev = preview();
      expect(prev?.classList).toContain('flex');
      expect(prev?.classList).toContain('justify-center');
      expect(prev?.classList).toContain('items-center');
    });

    it('should have x-padding 1rem on mobile', () => {
      expect(preview()?.classList).toContain('px-4');
    });

    it('should have x-padding 2rem on desktop', () => {
      expect(preview()?.classList).toContain('lg:px-8');
    });
  });

  describe('Flower', () => {
    const flower: () => HTMLImageElement | null =
      () => element.querySelector('.preview>.flower');

    it('should have a flower', () => {
      expect(flower()).toBeTruthy();
    });

    it('should have size 8rem on mobile', () => {
      expect(flower()?.classList).toContain('size-32');
    });

    it('should have size 12rem on desktop', () => {
      expect(flower()?.classList).toContain('lg:size-36');
    });

    it('should have postion bottom left', () => {
      const fl = flower();
      expect(fl?.classList).toContain('absolute');
      expect(fl?.classList).toContain('bottom-0');
      expect(fl?.classList).toContain('left-0');
    });
  });

  describe('Screenshot', () => {
    const screenshot: () => HTMLImageElement | null =
      () => element.querySelector('.preview>.screenshot');

    it('should have screenshot', () => {
      expect(screenshot()).toBeTruthy();
    });

    it('should have round corners', () => {
      expect(screenshot()?.classList).toContain('rounded-sm');
    });

    it('should have full width', () => {
      expect(screenshot()?.classList).toContain('w-full');
    });

    it('should have aspect ratio 4/3', () => {
      expect(screenshot()?.classList).toContain('aspect-4/3');
    });

    it('should have cover and positon center', () => {
      const screen = screenshot();
      expect(screen?.classList).toContain('object-contain');
      expect(screen?.classList).toContain('object-center');
    });

    it('should have z-index 1', () => {
      expect(screenshot()?.classList).toContain('z-1');
    });
  });

  describe('Details area', () => {
    const details: () => HTMLDivElement | null =
      () => element.querySelector('.projects-area>.details-area');

    it('should have details-area', () => {
      expect(details()).toBeTruthy();
    });

    it('should have padding top 2rem on desktop', () => {
      expect(details()?.classList).toContain('lg:pt-8');
    });

    it('should have direciton column', () => {
      const detail = details();
      expect(detail?.classList).toContain('flex');
      expect(detail?.classList).toContain('flex-col');
    });
  });

  describe('Board', () => {
    const board: () => HTMLDivElement | null =
      () => element.querySelector('.details-area>project-board');

    it('should have boar', () => {
      expect(board()).toBeTruthy();
    });

    it('should have full width', () => {
      expect(board()?.classList).toContain('w-full');
    });

    it('should have rounded corners', () => {
      expect(board()?.classList).toContain('rounded-sm');
    });

    it('should have black background', () => {
      expect(board()?.classList).toContain('bg-cblack');
    });

    it('should have white text', () => {
      expect(board()?.classList).toContain('tx-white');
    });

    it('should have positon relative', () => {
      expect(board()?.classList).toContain('relative');
    });
  });

  describe('Nav', () => {
    const navEl: () => HTMLElement | null =
      () => element.querySelector('.details-area>nav');

    it('should have nav', () => {
      expect(navEl()).toBeTruthy();
    });

    it('should have full width', () => {
      expect(navEl()?.classList).toContain('w-full');
    });

    it('should have y padding 2rem', () => {
      expect(navEl()?.classList).toContain('py-8');
    });

    it('should have x space between', () => {
      const nav = navEl();
      expect(nav?.classList).toContain('flex');
      expect(nav?.classList).toContain('justify-between');
    });
  });

  describe('Nav-Buttons', () => {
    const navBtns: () => NodeListOf<HTMLButtonElement> =
      () => element.querySelectorAll('nav button');

    it('should have 2 buttons', () => {
      expect(navBtns().length).toBe(2);
    });

    it('should be inline block', () => {
      navBtns().forEach(btn =>
        expect(btn.classList).toContain('inline-block')
      );
    });

    it('should have content "translated: projects.prev" on first button', () => {
      expect(navBtns()[0]?.textContent)
        .toBe('translated: projects.prev');
    });

    it('should have content "translated: projects.next" on second button"', () => {
      expect(navBtns()[1]?.textContent)
        .toBe('translated: projects.next');
    });
  });

  describe('Section Selector', () => {
    const selector: () => HTMLElement | null = 
      () => element.querySelector('.content>section-selector');

    it('should not have selector on mobile', () => {
      sec.mobile = true;
      fixture.detectChanges();
      expect(selector()).toBeNull();
    });

    describe('Desktop', () => {
      beforeEach(() => {
        sec.mobile = false;
        fixture.detectChanges();
      });

      it('should have section selector', () => {
        expect(selector()).toBeTruthy();
      });

      it('should have width 10%, full height', () => {
        const sel = selector();
        expect(sel?.classList).toContain('w-1/10');
        expect(sel?.classList).toContain('h-full');
      });

      it('should align center', () => {
        const sel = selector();
        expect(sel?.classList).toContain('flex');
        expect(sel?.classList).toContain('justify-center');
        expect(sel?.classList).toContain('items-center');
      });

      it('should be index = 3', () => {
        const selCom = fixture.debugElement
          .query(By.directive(SectionSelectorComponent))
          .componentInstance
        expect(selCom.index()).toBe(3)
      });
    });
  });
});
