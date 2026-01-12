import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSectionComponent } from './about-section.component';

describe('AboutSectionComponent', () => {
  let component: AboutSectionComponent;
  let fixture: ComponentFixture<AboutSectionComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutSectionComponent);
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
      () => element.querySelector('.content>.contentarea');
    
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
        expect(elem.classList).toContain('lg:h-9/10');
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
        expect(elem.classList).toContain('px-28');
        expect(elem.classList).toContain('py-18');
      }
      expect(elem).toBeTruthy();
    });
  });
});
