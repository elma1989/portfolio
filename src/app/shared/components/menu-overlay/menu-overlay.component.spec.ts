import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOverlayComponent } from './menu-overlay.component';
import { MockTranslatePipe } from '../../pipes/mock-translate.pipe';

describe('MenuOverlayComponent', () => {
  let component: MenuOverlayComponent;
  let fixture: ComponentFixture<MenuOverlayComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuOverlayComponent]
    })
    .overrideComponent(MenuOverlayComponent, {
      set: {
        imports: [
          MockTranslatePipe
        ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuOverlayComponent);
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
    const desc: () => HTMLElement | null =
      () => element.querySelector('header>.menu-desc');
    const close: () => HTMLButtonElement | null =
      () => element.querySelector('header>.close-btn');

    it('should have header', () => {
      expect(header()).toBeTruthy();
    });

    it('shoulde have x-space-between, y-center', () => {
      expect(header()?.classList.contains('flex') ?? false).toBeTrue();
      expect(header()?.classList.contains('justify-between') ?? false).toBeTrue();
      expect(header()?.classList.contains('items-center') ?? false).toBeTrue();
    });

    it('should have font-size 2rem', () => {
      expect(header()?.classList.contains('text-[2rem]') ?? false).toBeTrue();
    })

    it('should have menu-desk', () => {
      expect(desc()).toBeTruthy();
    });

    it('Desc should have blue text', () => {
      expect(desc()?.classList.contains('tx-blue') ?? false).toBeTrue();
    });

    it('H2 desc should have size 2rem', () => {
      expect(desc()?.classList.contains('text-[2rem]') ?? false).toBeTrue();
    });

    it('H2 content should be content correct', () => {
      expect(desc()?.textContent ?? '').toBe('translated: menu.title');
    });

    it('should have close-btn', () => {
      expect(close()).toBeTruthy();
    });

    it('close-btn should have orange text', () => {
      expect(close()?.classList.contains('tx-yellow') ?? false).toBeTrue();
    });

    it('close-btn should have content "X"', () => {
      expect(close()?.textContent ?? '').toBe('X');
    });
  });

  describe('Nav', () => {
    const nav: () => HTMLElement | null =
      () => element.querySelector('nav');
    const ul: () => HTMLElement | null = 
      () => element.querySelector('nav>ol');
    const items: () => NodeListOf<HTMLLIElement> = 
      () => element.querySelectorAll('nav>ol>li');

    it('shoud have nav', () => {
      expect(nav()).toBeTruthy();
    });

    it('should have ul', () => {
      expect(ul()).toBeTruthy();
    });

    it('ul should have direction column', () => {
      expect(ul()?.classList.contains('flex') ?? false).toBeTrue();
      expect(ul()?.classList.contains('flex-col') ?? false).toBeTrue();
    });

    it('ul should have gap 0.5rem', () => {
      expect(ul()?.classList.contains('gap-2') ?? false).toBeTrue();
    });

    it('should have 5 items', () => {
      expect(items().length).toBe(5);
    });

    it('All items should bold', () => {
      const allBold: boolean = [...items()].every(item => item.classList.contains('bold'));
      expect(allBold).toBeTrue();
    });
  })
});
