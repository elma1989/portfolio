import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionSelectorComponent } from './section-selector.component';

describe('SectionSelectorComponent', () => {
  let component: SectionSelectorComponent;
  let fixture: ComponentFixture<SectionSelectorComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionSelectorComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Selection-Area', () => {
    const area: () => HTMLElement | null =
      () => element.querySelector('.selection-area');
    
    it('should have selection area', () => {
      expect(area()).toBeTruthy();
    });

    it('should have direction column', () => {
      const elem: HTMLElement | null = area();
      expect(elem).toBeTruthy();
      expect(elem!.classList).toContain('flex');
      expect(elem!.classList).toContain('flex-col');
    });

    it('should have gap 1.25rem', () => {
      const elem: HTMLElement | null = area();
      expect(elem).toBeTruthy();
      expect(elem!.classList).toContain('gap-5');
    });
  });
});
