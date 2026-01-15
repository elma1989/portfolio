import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutOverlayComponent } from './about-overlay.component';

describe('AboutOverlayComponent', () => {
  let component: AboutOverlayComponent;
  let fixture: ComponentFixture<AboutOverlayComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutOverlayComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Header', () => {
    const header: () => HTMLElement | null =
      () => element.querySelector('header');

    it('should have header', () => {
      expect(header()).toBeTruthy();
    });

    it('should have full width', () => {
      expect(header()?.classList).toContain('w-full');
    });

    it('should be space between on mobile', () => {
      const elem: HTMLElement | null = header();
      expect(elem?.classList).toContain('flex');
      expect(elem?.classList).toContain('justify-between');
      expect(elem?.classList).toContain('items-center');
    });

    it('should be center on desktp', () => {
      expect(header()?.classList).toContain('lg:justify-center');
    });
  })
});
