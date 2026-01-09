import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOverlayComponent } from './menu-overlay.component';
import { MockTranslatePipe } from '../../pipes/mock-translate.pipe';
import { CommonModule } from '@angular/common';

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
          MockTranslatePipe,
          CommonModule
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
      () => element.querySelector('nav>ul');

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
  });

  describe('Nav-Items', () => {
    const items: () => NodeListOf<HTMLLIElement> = 
      () => element.querySelectorAll('ul>li');

      it('should have 5 items', () => {
      expect(items().length).toBe(5);
    });

    it('All items should bold', () => {
      const allBold: boolean = [...items()].every(item => item.classList.contains('font-bold'));
      expect(allBold).toBeTrue();
    });

    it('All items should have font size 1.5rem', () => {
      const allSize: boolean = [...items()].every(item => item.classList.contains('text-[1.5rem]'));
      expect(allSize).toBeTrue();
    });

    it('All intems should have cursor pointer', () => {
      const allPointer: boolean = [...items()].every(item => item.classList.contains('cursor-pointer'));
      expect(allPointer).toBeTrue();
    });

    it('All items should be a hover group', () => {
      const allGroup: boolean = [...items()].every(item => item.classList.contains('group'));
      expect(allGroup).toBeTrue();
    });
  });

  describe('Hover-Flower', () => {
    const flowers: () => NodeListOf<HTMLImageElement> =
      () => element.querySelectorAll('ul img');

      it('should have 5 flowers', () => {
        expect(flowers().length).toBe(5);
      });

      it('should all flowers have size 1.25rem', () => {
        const allSize: boolean = [...flowers()].every(fl => {
          const width: boolean = fl.classList.contains('w-5');
          const height: boolean = fl.classList.contains('h-5');
          return width && height;
        });
        expect(allSize).toBeTrue();
      });

      it('should all flowers be hidden', () => {
        const allHiddden: boolean = [...flowers()].every(fl => fl.classList.contains('hidden'));
        expect(allHiddden).toBeTrue();
      });

      it('should have margin-right 0.25rem', () => {
        const allMargin: boolean = [...flowers()].every(fl => fl.classList.contains('mr-1'));
        expect(allMargin).toBeTrue();
      });

      it('should shown on hover', () => {
        const allShown: boolean = [...flowers()].every(fl => fl.classList.contains('group-hover:inline'));
        expect(allShown).toBeTrue();
      });

      it('should have correct source', () => {
        const allSrc: boolean =  [...flowers()].every(fl => 
          fl.src == 'http://localhost:9876/assets/img/00_header/hover-flower.png')
        expect(allSrc).toBeTrue();
      });
  });
});
