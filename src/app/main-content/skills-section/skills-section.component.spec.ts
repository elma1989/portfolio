import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsSectionComponent } from './skills-section.component';

describe('SkillsSectionComponent', () => {
  let component: SkillsSectionComponent;
  let fixture: ComponentFixture<SkillsSectionComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsSectionComponent);
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

    it('should have content-limiter', () => {
      expect(content()).toBeTruthy();
    });

    it('should be flex-box', () => {
      expect(content()?.classList).toContain('flex')
    });
  });

  describe('Content-Area', () => {
    const area: () => HTMLDivElement | null =
      () => element.querySelector('.content-area');

    it('should have Conent-Area', () => {
      expect(area()).toBeTruthy();
    });

    it('should have full height', () => {
      expect(area()?.classList).toContain('h-full');
    });

    it('should have full width on mobile', () => {
      expect(area()?.classList).toContain('w-full');
    });

    it('should have 90% width on desktop', () => {
      expect(area()?.classList).toContain('lg:w-9/10');
    });

    it('should have padding 1rem on mobile', () => {
      expect(area()?.classList).toContain('p-4');
    });

    it('should have padding 10 0 10 7 on desktop', () => {
      const elem: HTMLElement | null = area();
      expect(elem?.classList).toContain('py-40');
      expect(elem?.classList).toContain('pr-0');
      expect(elem?.classList).toContain('pl-28');
    });

    it('should have gap 2rem col', () => {
      const elem: HTMLElement | null = area();
      expect(elem?.classList).toContain('flex');
      expect(elem?.classList).toContain('flex-col');
      expect(elem?.classList).toContain('gap-8');
    });
  });

  describe('H1', () => {
    const h1: () => HTMLElement | null =
      () => element.querySelector('.content-area>h1');

    it('should have h1', () => {
      expect(h1()).toBeTruthy();
    });

    it('should have font "Eczar"', () => {
      expect(h1()?.classList).toContain('font-eczar');
    });

    it('should have size 2.5rem on mobile', () => {
      expect(h1()?.classList).toContain('text-[2.5rem]/[2.5rem]');
    });

    it('should have size 4.5rem on desktop', () => {
      expect(h1()?.classList).toContain('lg:text-[4.5rem]/[4.5rem]');
    });

    it('should have content "translated: skills.title"', () => {
      expect(h1()?.textContent)
        .toBe('translated: skills.title');
    });
  });
});
