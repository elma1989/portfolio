import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainContentComponent } from './main-content.component';
import { SectionService } from '../shared/services/section.service';
import { SectionType } from '../shared/enums/section-type';
import { Signal, signal } from '@angular/core';
import { TranslationService } from '../shared/services/translation.service';
import { MockTranslatePipe } from '../shared/pipes/mock-translate.pipe';
import { CommonModule } from '@angular/common';

const langSignal = signal<'en' | 'de'>('en');

const translationServiceMock = {
  get lang(): Signal<'en' | 'de'> { return langSignal.asReadonly(); },
  set lang(lang: 'en' | 'de') { langSignal.set(lang); },
  translate: (key: string) => `translated: ${key}`
};

describe('MainContentComponent', () => {
  let component: MainContentComponent;
  let fixture: ComponentFixture<MainContentComponent>;
  let element: HTMLElement;
  let sec: SectionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MainContentComponent,
        CommonModule,
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

    fixture = TestBed.createComponent(MainContentComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    sec = TestBed.inject(SectionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Sections', () => {
    const sections: () => NodeListOf<HTMLElement> =
      () => element.querySelectorAll('section');

    it('should be 6 Sections on mobile', () => {
      (window as any).innerWidth = 672;
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges()
      expect(sections().length).toBe(6);
    });

    it('should be 1 Section on desktop', () => {
      (window as any).innerWidth = 1024;
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      expect(sections().length).toBe(1);
    });
  });

  describe('Hero', () => {
    const hero: () => HTMLElement | null =
      () => element.querySelector('section[hero]')

    beforeEach(() => {
      sec.section = SectionType.HERO;
      fixture.detectChanges();
    });

    it('should exist on mobile', () => {
      (window as any).innerWidth = 672;
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      expect(hero()).toBeTruthy();
    });

    it('should exist on desktop', () => {
      (window as any).innerWidth = 1024;
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      expect(hero()).toBeTruthy();
    });

    it('should have full viewport size', () => {
      expect(hero()?.classList.contains('h-dvh') ?? false).toBeTrue();
      expect(hero()?.classList.contains('w-full') ?? false).toBeTrue();
    });

    it('should padding top 9dvh on mobile', () => {
      expect(hero()?.classList.contains('pt-[9dvh]') ?? false).toBeTrue();
    });

    it('should padding top 10dvh on desktop', () => {
      expect(hero()?.classList.contains('lg:pt-[10dvh]') ?? false).toBeTrue();
    });

    it('should content x-center', () => {
      expect(hero()?.classList.contains('flex') ?? false).toBeTrue();
      expect(hero()?.classList.contains('justify-center') ?? false).toBeTrue();
    });

    it('should have blue background', () => {
      expect(hero()?.classList.contains('bg-blue') ?? false).toBeTrue();
    });
  });

  describe('About', () => {
    const about: () => HTMLElement | null =
      () => element.querySelector('section[about]')

    beforeEach(() => {
      sec.section = SectionType.ABOUT;
      fixture.detectChanges();
    });

    it('should exist on mobile', () => {
      (window as any).innerWidth = 672;
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      expect(about()).toBeTruthy();
    });

    it('should exist on desktop', () => {
      (window as any).innerWidth = 1024;
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      expect(about()).toBeTruthy();
    });

    it('should have full viewport size', () => {
      expect(about()?.classList.contains('h-dvh') ?? false).toBeTrue();
      expect(about()?.classList.contains('w-full') ?? false).toBeTrue();
    });

    it('should padding top 9dvh on mobile', () => {
      expect(about()?.classList.contains('pt-[9dvh]') ?? false).toBeTrue();
    });

    it('should padding top 10dvh on desktop', () => {
      expect(about()?.classList.contains('lg:pt-[10dvh]') ?? false).toBeTrue();
    });

    it('should content x-center', () => {
      expect(about()?.classList.contains('flex') ?? false).toBeTrue();
      expect(about()?.classList.contains('justify-center') ?? false).toBeTrue();
    });

    it('should have white background', () => {
      expect(about()?.classList.contains('bg-cwhite') ?? false).toBeTrue();
    });
  });

  describe('Skills', () => {
    const skills: () => HTMLElement | null =
      () => element.querySelector('section[skills]')

    beforeEach(() => {
      sec.section = SectionType.SKILLS;
      fixture.detectChanges();
    });

    it('should exist on mobile', () => {
      (window as any).innerWidth = 672;
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      expect(skills()).toBeTruthy();
    });

    it('should exist on desktop', () => {
      (window as any).innerWidth = 1024;
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      expect(skills()).toBeTruthy();
    });

    it('should have full width', () => {
      expect(skills()?.classList.contains('w-full') ?? false).toBeTrue();
    });

    it('should have full height on moble, auto height on tablet and full height on desktop', () => {
      const skillSec = skills();
      expect(skillSec?.classList).toContain('h-auto');
      expect(skillSec?.classList).toContain('md:h-dvh');
    });

    it('should padding top 9dvh on mobile', () => {
      expect(skills()?.classList.contains('pt-[9dvh]') ?? false).toBeTrue();
    });

    it('should padding top 10dvh on desktop', () => {
      expect(skills()?.classList.contains('lg:pt-[10dvh]') ?? false).toBeTrue();
    });

    it('should content x-center', () => {
      expect(skills()?.classList.contains('flex') ?? false).toBeTrue();
      expect(skills()?.classList.contains('justify-center') ?? false).toBeTrue();
    });

    it('should have black background', () => {
      expect(skills()?.classList.contains('bg-cblack') ?? false).toBeTrue();
    });
  });

  describe('Projects', () => {
    const projects: () => HTMLElement | null =
      () => element.querySelector('section[projects]')

    beforeEach(() => {
      sec.section = SectionType.PROJECTS;
      fixture.detectChanges();
    });

    it('should exist on mobile', () => {
      (window as any).innerWidth = 672;
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      expect(projects()).toBeTruthy();
    });

    it('should exist on desktop', () => {
      (window as any).innerWidth = 1024;
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      expect(projects()).toBeTruthy();
    });

    it('should have full width', () => {
      expect(projects()?.classList).toContain('w-full');
    });

    it('should have viewport height on desktop', () => {
      expect(projects()?.classList).toContain('lg:h-dvh');
    })

    it('should padding top 9dvh on mobile', () => {
      expect(projects()?.classList.contains('pt-[9dvh]') ?? false).toBeTrue();
    });

    it('should padding top 10dvh on desktop', () => {
      expect(projects()?.classList.contains('lg:pt-[10dvh]') ?? false).toBeTrue();
    });

    it('should content x-center', () => {
      expect(projects()?.classList.contains('flex') ?? false).toBeTrue();
      expect(projects()?.classList.contains('justify-center') ?? false).toBeTrue();
    });

    it('should have white background', () => {
      expect(projects()?.classList.contains('bg-cwhite') ?? false).toBeTrue();
    });
  });

  describe('References', () => {
    const ref: () => HTMLElement | null =
      () => element.querySelector('section[references]')

    beforeEach(() => {
      sec.section = SectionType.REFERENCES;
      fixture.detectChanges();
    });

    it('should exist on mobile', () => {
      (window as any).innerWidth = 672;
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      expect(ref()).toBeTruthy();
    });

    it('should exist on desktop', () => {
      (window as any).innerWidth = 1024;
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      expect(ref()).toBeTruthy();
    });

    it('should have full viewport size', () => {
      expect(ref()?.classList.contains('h-dvh') ?? false).toBeTrue();
      expect(ref()?.classList.contains('w-full') ?? false).toBeTrue();
    });

    it('should padding top 9dvh on mobile', () => {
      expect(ref()?.classList.contains('pt-[9dvh]') ?? false).toBeTrue();
    });

    it('should padding top 10dvh on desktop', () => {
      expect(ref()?.classList.contains('lg:pt-[10dvh]') ?? false).toBeTrue();
    });

    it('should content x-center', () => {
      expect(ref()?.classList.contains('flex') ?? false).toBeTrue();
      expect(ref()?.classList.contains('justify-center') ?? false).toBeTrue();
    });

    it('should have blue background', () => {
      expect(ref()?.classList.contains('bg-blue') ?? false).toBeTrue();
    });
  });

  describe('Contact', () => {
    const contact: () => HTMLElement | null =
      () => element.querySelector('section[contact]')

    beforeEach(() => {
      sec.section = SectionType.CONTACT;
      fixture.detectChanges();
    });

    it('should exist on mobile', () => {
      (window as any).innerWidth = 672;
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      expect(contact()).toBeTruthy();
    });

    it('should exist on desktop', () => {
      (window as any).innerWidth = 1024;
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      expect(contact()).toBeTruthy();
    });

    it('should have full viewport size', () => {
      expect(contact()?.classList.contains('w-full') ?? false).toBeTrue();
    });

    it('should padding top 9dvh on mobile', () => {
      expect(contact()?.classList.contains('pt-[9dvh]') ?? false).toBeTrue();
    });

    it('should padding top 10dvh on desktop', () => {
      expect(contact()?.classList.contains('lg:pt-[10dvh]') ?? false).toBeTrue();
    });

    it('should content x-center', () => {
      expect(contact()?.classList.contains('flex') ?? false).toBeTrue();
      expect(contact()?.classList.contains('items-center') ?? false).toBeTrue();
    });

    it('should have black background', () => {
      expect(contact()?.classList.contains('bg-cblack') ?? false).toBeTrue();
    });
  });

  describe('Header', () => {
    const header: () => HTMLElement | null =
      () => element.querySelector('header[app-header]');

    it('shoule exist', () => {
      expect(header()).toBeTruthy();
    });

    it('should have full width', () => {
      expect(header()?.classList.contains('w-full') ?? false).toBeTrue();
    });

    it('shoulde have height 9dvh on Mobile', () => {
      expect(header()?.classList.contains('h-[9dvh]') ?? false).toBeTrue();
    });

    it('should have height 10dvh on Desktop', () => {
      expect(header()?.classList.contains('lg:h-[10dvh]') ?? false).toBeTrue();
    });

    it('should have position fixed', () => {
      expect(header()?.classList.contains('fixed') ?? false).toBeTrue();
      expect(header()?.classList.contains('top-0') ?? false).toBeTrue();
      expect(header()?.classList.contains('left-0') ?? false).toBeTrue();
    });

    it('should have x-center-content', () => {
      expect(header()?.classList.contains('flex') ?? false).toBeTrue();
      expect(header()?.classList.contains('justify-center') ?? false).toBeTrue();
    });

    it('should have Z-index 2', () => {
      expect(header()?.classList.contains('z-2') ?? false).toBeTrue();
    });
  });
});
