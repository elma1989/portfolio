import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsOverlayComponent } from './skills-overlay.component';

describe('SkillsOverlayComponent', () => {
  let component: SkillsOverlayComponent;
  let fixture: ComponentFixture<SkillsOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
