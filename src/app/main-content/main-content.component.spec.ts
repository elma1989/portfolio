import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContentComponent } from './main-content.component';
import { SectionService } from '../shared/services/section.service';
import { SectionType } from '../shared/enums/section-type';

describe('MainContentComponent', () => {
  let component: MainContentComponent;
  let fixture: ComponentFixture<MainContentComponent>;
  let element: HTMLElement;
  let sec: SectionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainContentComponent]
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
});
