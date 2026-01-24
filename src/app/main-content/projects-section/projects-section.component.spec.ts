import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsSectionComponent } from './projects-section.component';
import { ElementRef, Signal, signal } from '@angular/core';
import { TranslationService } from '../../shared/services/translation.service';

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

    it('should have padding 2 0 7 7 on desktop', () => {
      expect(area()?.classList).toContain('lg:pt-8');
      expect(area()?.classList).toContain('lg:pr-0');
      expect(area()?.classList).toContain('lg:pb-28')
      expect(area()?.classList).toContain('lg:pl-28');
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

    it('should have 75% width on desktop', () => {
      expect(header()?.classList).toContain('lg:w-3/4');
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

    it('should have full size', () => {
      expect(projectsArea()?.classList).toContain('size-full');
    });

    it('should have gap 2em column', () => {
      const area = projectsArea();
      expect(area?.classList).toContain('flex');
      expect(area?.classList).toContain('flex-col');
      expect(area?.classList).toContain('gap-8');
    });

    it('should have direction row on desktop', () => {
      expect(projectsArea()?.classList).toContain('lg:flex-row');
    });
  });

  describe('Preview', () => {
    const preview: () => HTMLDivElement | null =
      () => element.querySelector('.projects-area>.preview');

    it('should have preview', () => {
      expect(preview()).toBeTruthy();
    });

    it('should have full width on mobile', () => {
      expect(preview()?.classList).toContain('w-full');
    })

    it('should have full height on desktop', () => {
      expect(preview()?.classList).toContain('lg:h-full');
      expect(preview()?.classList).toContain('lg:w-auto');
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

    it('should have size 8rem on mobile', ()  => {
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

    it('should have full width', () => {
      expect(screenshot()?.classList).toContain('w-full');
    });

    it('should have aspect ratio 4/3', () => {
      expect(screenshot()?.classList).toContain('aspect-4/3');
    });

    it('should have cover and positon center', () => {
      const screen = screenshot();
      expect(screen?.classList).toContain('object-cover');
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

    it('should have full size', () => {
      expect(details()?.classList).toContain('size-full');
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
      () => element.querySelector('.details-area>.board');

    it('should have boar', () => {
      expect(board()).toBeTruthy();
    });

    it('should have full width', () => {
      expect(board()?.classList).toContain('w-full');
    });

    it('should grow', () => {
      expect(board()?.classList).toContain('flex-1');
    });

    it('should have black background', () => {
      expect(board()?.classList).toContain('bg-cblack');
    });

    it('should have white text', () => {
      expect(board()?.classList).toContain('tx-white');
    });

    it('should have padding 1rem on mobile', () => {
      expect(board()?.classList).toContain('p-4');
    });

    it('should have padding 2rem on desktop', () => {
      expect(board()?.classList).toContain('lg:p-8');
    });

    it('should have gap 2 rem column y-center', () => {
      const b = board();
      expect(b?.classList).toContain('flex');
      expect(b?.classList).toContain('flex-col');
      expect(b?.classList).toContain('justify-center');
      expect(b?.classList).toContain('gap-8');
    });
  });

  describe('Board-Header', () => {
    const boardHeader: () => HTMLElement | null =
      () => element.querySelector('.board>header');
    const title: () => HTMLElement | null =
      () => element.querySelector('.board h2');
    const icon: () => HTMLImageElement | null =
      () => element.querySelector('.board img');

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

  describe('Paragraphs', ()  => {
    const paragraphs: () => NodeListOf<HTMLParagraphElement> = 
      () => element.querySelectorAll('.board>p');

    it('should have 2 paragraphs', () => {
      expect(paragraphs().length).toBe(2);
    });

    it('first paragraph should be bloe', () => {
      expect(paragraphs()[0]?.classList).toContain('tx-blue');
    });
  });

  describe('footer', () => {
    const footer: () => HTMLElement | null =
      () => element.querySelector('.board>footer');

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

    it('should hava x space between on mobile' , () => {
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
      () => element.querySelectorAll('.board>footer>a');

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
});
