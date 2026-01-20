import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsOverlayComponent } from './skills-overlay.component';
import { SectionService } from '../../../shared/services/section.service';

describe('SkillsOverlayComponent', () => {
  let component: SkillsOverlayComponent;
  let fixture: ComponentFixture<SkillsOverlayComponent>;
  let element: HTMLElement;
  let sec: SectionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsOverlayComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SkillsOverlayComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    sec = TestBed.inject(SectionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Close-Btn', () => {
    const closeBtn: () => HTMLButtonElement | null =
      () => element.querySelector('button');

    it('should not render on desktop', () => {
      sec.mobile = false;
      fixture.detectChanges();
      expect(closeBtn()).toBeNull();
    });

    describe('Mobile', () => {
      beforeEach(() => {
        sec.mobile = true;
        fixture.detectChanges();
      });

      it('should render on mobile', () => {
        expect(closeBtn()).toBeTruthy();
      });

      it('should have size 2rem', () => {
        expect(closeBtn()?.classList).toContain('size-8');
      });

      it('should have content "X"', () => {
        expect(closeBtn()?.textContent).toBe('X');
      });

      it('sould have bold text', () => {
        expect(closeBtn()?.classList).toContain('font-bold');
      });
    });
  });
});
