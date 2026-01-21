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
  })
});
