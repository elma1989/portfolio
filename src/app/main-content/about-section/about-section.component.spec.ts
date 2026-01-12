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
});
