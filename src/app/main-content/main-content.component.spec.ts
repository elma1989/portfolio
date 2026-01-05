import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContentComponent } from './main-content.component';

describe('MainContentComponent', () => {
  let component: MainContentComponent;
  let fixture: ComponentFixture<MainContentComponent>;
  let element: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainContentComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
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
      expect(sections().length).toBe(6);
    });

    it('should be 1 Section on desktop', () => {
      (window as any).innerWidth = 1024;
      window.dispatchEvent(new Event('resize'));
      expect(sections().length).toBe(1);
    });
  });
});
