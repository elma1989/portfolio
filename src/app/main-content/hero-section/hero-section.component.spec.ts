import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSectionComponent } from './hero-section.component';

describe('HeroSectionComponent', () => {
  let component: HeroSectionComponent;
  let fixture: ComponentFixture<HeroSectionComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroSectionComponent);
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
    
    it('should have content', () => {
      expect(content()).toBeTruthy();
    });

    it('should be a flex-box', () => {
      expect(content()?.classList.contains('flex') ?? false).toBeTrue();
    });
  });

  describe('Content-Area', () => {
    const area: () => HTMLDivElement | null =
      () => element.querySelector('.content>.content-area');

      it('should have a content-area', () => {
        expect(area()).toBeTruthy();
      });

      it('should have full size on mobile', () => {
        expect(area()?.classList.contains('w-full') ?? false).toBeTrue();
        expect(area()?.classList.contains('h-full') ?? false).toBeTrue();
      });

      it('should have width 90% on desktop', () => {
        expect(area()?.classList.contains('w-9/10') ?? false).toBeTrue();
      });

      it('should have position relative', () => {
        expect(area()?.classList.contains('relative') ?? false).toBeTrue();
      });

      it('should have direction column for moble', () => {
        expect(area()?.classList.contains('flex') ?? false).toBeTrue();
        expect(area()?.classList.contains('flex-col') ?? false).toBeTrue();
      });

      it('should have direction row on desktop', () => {
        expect(area()?.classList.contains('lg:flex-row') ?? false).toBeTrue();
      })
  })
});
