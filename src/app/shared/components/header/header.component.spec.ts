import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { SectionService } from '../../services/section.service';
import { SectionType } from '../../enums/section-type';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let element: HTMLElement;
  let sec: SectionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
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

    it('should have social media on deskop in hero-section', () => {
      const social: () => HTMLElement | null =
        () => element.querySelector('social-media');
      (window as any).innerWidth = 672;
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      expect(social()).toBeNull();

      (window as any).innerWidth = 1024;
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      expect(social()).toBeTruthy();

      sec.section = SectionType.ABOUT;
      expect(social()).toBeNull();

      sec.section = SectionType.SKILLS;
      expect(social()).toBeNull();

      sec.section = SectionType.PROJECTS;
      expect(social()).toBeNull();

      sec.section = SectionType.REFERENCES;
      expect(social()).toBeNull();

      sec.section = SectionType.CONTACT;
      expect(social()).toBeNull();
    });
  });
});
