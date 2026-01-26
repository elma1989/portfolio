import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectBoardComponent } from './project-board.component';
import { Signal, signal } from '@angular/core';
import { TranslationService } from '../../../shared/services/translation.service';
import { SectionService } from '../../../shared/services/section.service';

const langSignal = signal<'en' | 'de'>('en');

const translationServiceMock = {
  get lang(): Signal<'en' | 'de'> { return langSignal.asReadonly(); },
  set lang(lang: 'en' | 'de') { langSignal.set(lang); },
  translate: (key: string) => `translated: ${key}`
};

describe('ProjectBoardComponent', () => {
  let component: ProjectBoardComponent;
  let fixture: ComponentFixture<ProjectBoardComponent>;
  let element: HTMLElement;
  let sec: SectionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectBoardComponent],
      providers: [
        {
          provide: TranslationService,
          useValue: translationServiceMock
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectBoardComponent);
    fixture.componentRef.setInput('project',
      {
        name: 'Join',
        icon: 'check',
        background: 'yellow',
        flower: 'orange',
        screenschot: 'join',
        langKey: 'join',
        skills: ['HTML', 'CSS', 'TypeScript', 'Angular', 'Firebase'],
        github: 'join',
        url: 'angular-projects/join/'
      });
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    sec = TestBed.inject(SectionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Header', () => {
    const boardHeader: () => HTMLElement | null =
      () => element.querySelector('header');
    const title: () => HTMLElement | null =
      () => element.querySelector('header>h2');
    const icon: () => HTMLImageElement | null =
      () => element.querySelector('header>img');

    it('should have header', () => {
      expect(boardHeader()).toBeTruthy();
    });

    it('should have full width, height 2.5rem', () => {
      const header = boardHeader();
      expect(header?.classList).toContain('w-full');
      expect(header?.classList).toContain('h-10');
    });

    it('should have x-space-between, y-bottom', () => {
      const header = boardHeader();
      expect(header?.classList).toContain('flex');
      expect(header?.classList).toContain('justify-between');
      expect(header?.classList).toContain('items-end');
    });

    it('should have title', () => {
      expect(title()).toBeTruthy();
    });

    it('title should have font 2rem bold', () => {
      const h2 = title();
      expect(h2?.classList).toContain('text-[2rem]/[2rem]');
      expect(h2?.classList).toContain('font-bold');
    });

    it('should have project-icon', () => {
      expect(icon()).toBeTruthy();
    });

    it('icon should have size 2rem', () => {
      expect(icon()?.classList).toContain('size-8');
    });
  });

  describe('Paragraphs', () => {
    const paragraphs: () => NodeListOf<HTMLParagraphElement> =
      () => element.querySelectorAll(':scope>p');

    it('should have 2 paragraphs', () => {
      expect(paragraphs().length).toBe(2);
    });

    it('first paragraph should be blue', () => {
      expect(paragraphs()[0]?.classList).toContain('tx-blue');
    });
  });

  describe('footer', () => {
    const footer: () => HTMLElement | null =
      () => element.querySelector('footer');

    it('should have footer', () => {
      expect(footer()).toBeTruthy();
    });

    it('should have full width', () => {
      expect(footer()?.classList).toContain('w-full');
    });

    it('should have direction column, gap 1rem on xs-mobile', () => {
      const foot = footer();
      expect(foot?.classList).toContain('flex');
      expect(foot?.classList).toContain('flex-col');
      expect(foot?.classList).toContain('gap-4');
    });

    it('should hava x space between on mobile', () => {
      const foot = footer();
      expect(foot?.classList).toContain('min-[390px]:flex-row');
      expect(foot?.classList).toContain('min-[390px]:justify-between');
    });

    it('should have align left, gap 2rem on desktop', () => {
      const foot = footer();
      expect(foot?.classList).toContain('lg:justify-start');
      expect(foot?.classList).toContain('lg:gap-8');
    });
  });

  describe('links in footer', () => {
    const links: () => NodeListOf<HTMLAnchorElement> =
      () => element.querySelectorAll('footer>a');

    it('should have 2 anchors', () => {
      expect(links().length).toBe(2);
    });

    it('should be a block', () => {
      links().forEach(link =>
        expect(link.classList).toContain('block')
      );
    });

    it('should default button be in use', () => {
      links().forEach(link =>
        expect(link.classList).toContain('btn-default')
      );
    });

    it('should have target blank', () => {
      links().forEach(link =>
        expect(link.target).toBe('_blank')
      );
    });

    it('frist link should have content "GitHub ➜"', () => {
      expect(links()[0]?.textContent).toBe('GitHub ➜');
    });

    it('first link goes to github', () => {
      expect(links()[0]?.href).toContain('https://github.com/elma1989/');
    });

    it('second link should have context "Live Test ➜"', () => {
      expect(links()[1]?.textContent).toBe('Live Test ➜');
    });

    it('second link goes to webserver', () => {
      expect(links()[1]?.href).toContain('https://marco-elste.developerakademie.net/');
    });
  });

  describe('Overlay', () => {
    const overlay: () => HTMLDivElement | null =
      () => element.querySelector('.overlay');

    it('should have overlay', () => {
      expect(overlay()).toBeTruthy();
    });

    it('should have class "open" if open', () => {
      component.overlay.set(true);
      fixture.detectChanges();
      expect(overlay()?.classList).toContain('open');
    });

    it('should not have class "open" if not open', () => {
      component.overlay.set(false);
      fixture.detectChanges();
      expect(overlay()?.classList).not.toContain('open');
    });

    it('should have blue background', () => {
      expect(overlay()?.classList).toContain('bg-blue');
    });

    it('should have rounded 0.25rem', () => {
      expect(overlay()?.classList).toContain('rounded-sm');
    });

    it('should have width 80% on desktop', () => {
      expect(overlay()?.classList).toContain('lg:w-4/5');
    });

    it('should have padding 1rem mobile', () => {
      expect(overlay()?.classList).toContain('p-4');
    });

    it('should have padding 2rem on desktop', () => {
      expect(overlay()?.classList).toContain('lg:p-8');
    });

    it('should have position align right 1rem from left on mobile', () => {
      const ol = overlay();
      expect(ol?.classList).toContain('absolute');
      expect(ol?.classList).toContain('left-4');
      expect(ol?.classList).toContain('right-0');
    });

    it('should have positon right 2rem on desktop', () => {
      expect(overlay()?.classList).toContain('lg:right-8');
    })

    it('should have position 0.5rem above', () => {
      expect(overlay()?.classList).toContain('bottom-[calc(100%+0.5rem)]');
    });

    it('should have position 1rem below top of box on desktop', () => {
      expect(overlay()?.classList).toContain('lg:bottom-[calc(100%-1rem)]');
    });

    it('should have gap 1rem column', () => {
      const ol = overlay();
      expect(ol?.classList).toContain('flex');
      expect(ol?.classList).toContain('flex-col');
      expect(ol?.classList).toContain('gap-4');
    });
  });

  describe('Overlay Header', () => {
    const headerEl: () => HTMLElement | null =
      () => element.querySelector('.overlay>header');

    beforeEach(() => {
      component.overlay.set(true);
      fixture.detectChanges();
    });

    it('should not have header on desktop', () => {
      sec.mobile = false;
      fixture.detectChanges();
      expect(headerEl()).toBeNull();
    });

    describe('Mobile', () => {
      beforeEach(() => {
        sec.mobile = true;
        fixture.detectChanges();
      });

      const closeBtn: () => HTMLButtonElement | null =
        () => headerEl()?.querySelector('button') ?? null;

      it('should have header on mobile', () => {
        expect(headerEl()).toBeTruthy();
      });

      it('should have full width', () => {
        expect(headerEl()?.classList).toContain('w-full');
      });

      it('should have align right', () => {
        const header = headerEl();
        expect(header?.classList).toContain('flex');
        expect(header?.classList).toContain('justify-end');
      });

      it('should button have size 2rem', () => {
        expect(closeBtn()?.classList).toContain('size-8');
      });

      it('should button have content "X"', () => {
        expect(closeBtn()?.textContent).toBe('X');
      });

      it('should close on click of button', () => {
        closeBtn()?.click();
        fixture.detectChanges();
        expect(component.overlay()).toBeFalse();
      });
    });
  });

  describe('Overlay Paragraph', () => {
    const paragraph: () => HTMLParagraphElement | null =
      () => element.querySelector('.overlay>p');

    it('should have paragraph', () => {
      expect(paragraph()).toBeTruthy();
    });

    it('should have height 4rem on mobile', () => {
      expect(paragraph()?.classList).toContain('h-16');
    });

    it('should have height 2rem on desktop', () => {
      expect(paragraph()?.classList).toContain('lg:h-8');
    });

    it('should have auto hyphens', () => {
      expect(paragraph()?.classList).toContain('hyphens-auto');
    });
  });
});
