import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionSelectorComponent } from './section-selector.component';
import { SectionService } from '../../services/section.service';
import { SectionType } from '../../enums/section-type';

describe('SectionSelectorComponent', () => {
  let component: SectionSelectorComponent;
  let fixture: ComponentFixture<SectionSelectorComponent>;
  let element: HTMLElement;
  let sec: SectionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionSelectorComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    sec = TestBed.inject(SectionService);
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
  
  describe('Selectors', () => {
    const selectors: () => NodeListOf<HTMLButtonElement> =
      () => element.querySelectorAll('.selection-area>.selector');

    it('should have 6 selectors', () => {
      expect(selectors().length).toBe(6);
    });

    it('sould have content "◆" on current index', () => {
      expect(selectors()[0]?.textContent ?? '')
        .toBe(' ◆ ');
    });

    it('should have content "●" on other indeces', () => {
      const array: HTMLButtonElement[] = [...selectors()]
      if(array[0]) array.splice(0, 1);
      const allContent: boolean = array.every(sel => sel.textContent = ' ● ');
      expect(allContent).toBeTrue();
    });

    it('shuld selected Selctor be orange', () => {
      const elem: HTMLElement | null = selectors()[0];
      expect(elem).toBeTruthy();
      expect(elem!.classList).toContain('tx-orange');
    });

    it('should other selectors be white', () => {
      const allWhite: boolean = [...selectors()]
        .splice(0, 1)
        .every(sel => sel.classList.contains('tx-white'));
      expect(allWhite).toBeTrue();
    });

    it('should all selectors have display block', () => {
      const allBlock: boolean = [...selectors()]
        .every(sel => sel.classList.contains('block'));
      expect(allBlock).toBeTrue();
    });

    it('should chenge section on click', () => {
      const elems: NodeListOf<HTMLButtonElement> = selectors();
      if (elems.length == 6) {
        elems[0].click();
        fixture.detectChanges();
        expect(sec.section()).toBe(SectionType.HERO);

        elems[1].click();
        fixture.detectChanges();
        expect(sec.section()).toBe(SectionType.ABOUT);

        elems[2].click();
        fixture.detectChanges();
        expect(sec.section()).toBe(SectionType.SKILLS);

        elems[3].click();
        fixture.detectChanges();
        expect(sec.section()).toBe(SectionType.PROJECTS);

        elems[4].click();
        fixture.detectChanges();
        expect(sec.section()).toBe(SectionType.REFERENCES);

        elems[5].click();
        fixture.detectChanges();
        expect(sec.section()).toBe(SectionType.CONTACT);
      }
    })
  });


});
