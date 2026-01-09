import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSectionComponent } from './hero-section.component';
import { SectionService } from '../../shared/services/section.service';
import { SectionType } from '../../shared/enums/section-type';

describe('HeroSectionComponent', () => {
  let component: HeroSectionComponent;
  let fixture: ComponentFixture<HeroSectionComponent>;
  let element: HTMLElement;
  let sec: SectionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSectionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeroSectionComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    sec = TestBed.inject(SectionService);
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
  });

  describe('Desc-Area', () => {
    const desc: () => HTMLDivElement | null =
      () => element.querySelector('.content-area>.desc-area')

    it('should have desc-area', () => {
      expect(desc()).toBeTruthy();
    });

    it('should have full width and half height on mobile', () => {
      expect(desc()?.classList.contains('w-full') ?? false).toBeTrue();
      expect(desc()?.classList.contains('h-1/2') ?? false).toBeTrue();
    });

    it('should have half width and full height on desktop', () => {
      expect(desc()?.classList.contains('lg:w-1/2') ?? false).toBeTrue();
      expect(desc()?.classList.contains('lg:h-full') ?? false).toBeTrue();
    });
  });

  describe('H1 in desc', () => {
    const h1s: () => NodeListOf<HTMLElement> = 
      () => element.querySelectorAll('.desc-area>h1');
    
    it('should have 2 h1', () => {
      expect(h1s().length).toBe(2);
    });

    it('should have font "Eczar"', () => {
      const allEczar:boolean = [...h1s()].every(h1 => h1.classList.contains('font-eczar'));
      expect(allEczar).toBeTrue();
    });

    it('should have font size 4.5rem and line-hight 4.5rem on mobile', () => {
      const allSize: boolean = [...h1s()].every(h1 => h1.classList.contains('text-[4.5rem]/[4.5rem]'));
      expect(allSize).toBeTrue();
    });

    it('should have font size 6rem and line height 6rem on desktop', () => {
      const allSize: boolean = [...h1s()].every(h1 => h1.classList.contains('lg:text-[6rem]/[6rem]'));
      expect(allSize).toBeTrue();
    });

    it('First H1 schould be "Marco"', () => {
      expect(h1s()[0]?.textContent ?? '').toBe('Marco');
    });

    it('Secound h1 should be "Elste"', () => {
      expect(h1s()[1]?.textContent ?? '').toBe('Elste');
    });
  });

  describe('H2 in desc', () => {
    const h2s: () => NodeListOf<HTMLElement> = 
      () => element.querySelectorAll('.desc-area>h2');
    
    it('should have 2 h2', () => {
      expect(h2s().length).toBe(2);
    });

    it('should have size 2rem and 2rem line height on mobile', () => {
      const bothSize: boolean = [...h2s()].every(h2 => h2.classList.contains('text-[2rem]/[2rem]'));
      expect(bothSize).toBeTrue();
    });

    it('should have font size 3rem and line height 3rem on desktop', () => {
      const bothSize: boolean = [...h2s()].every(h2 => h2.classList.contains('lg:text-[3rem]/[3rem]'));
      expect(bothSize).toBeTrue();
    });

    it('Frist h2 should have content "translated: hero.greating"', () => {
      expect(h2s()[0]?.textContent ?? '')
        .toBe('translated: hero.greating');
    });

    it('Second h2 should have content "Frontend Developer"', () => {
      expect(h2s()[1]?.textContent ?? '')
        .toBe('Frontend Developer');
    })
  });

  describe('Button in desc', () => {
    const btn: () => HTMLButtonElement | null = 
      () => element.querySelector('.desc-area>button');

    it('should have Contact-Button', () => {
      expect(btn()).toBeTruthy();
    });

    it('should have class "btn-default"', () => {
      expect(btn()?.classList.contains('btn-default') ?? false).toBeTrue();
    });

    it('should have content "translated: hero.btn"', () => {
      expect(btn()?.textContent ?? '')
        .toBe('translated: hero.btn');
    });

    it('shoud have margin top 2rem' , () => {
      expect(btn()?.classList.contains('mt-8') ?? false).toBeTrue();
    });

    it('should click on button', () => {
      btn()?.click();
      fixture.detectChanges();
      expect(sec.section()).toBe(SectionType.CONTACT);
    });
  });

  describe('Image-Area', () => {
    const area: () => HTMLDivElement | null = 
      () => element.querySelector('.content-area>.img-area');

    it('should have image-area', () => {
      expect(area()).toBeTruthy();
    });

    it('should have full width and half height on mobile', () => {
      expect(area()?.classList.contains('w-full') ?? false).toBeTrue();
      expect(area()?.classList.contains('h-1/2') ?? false).toBeTrue();
    });

    it('should have half-width and full height on desktop', () => {
      expect(area()?.classList.contains('lg:h-full') ?? false).toBeTrue();
      expect(area()?.classList.contains('lg:w-1/2') ?? false).toBeTrue();
    });

    it('should have position relative', () => {
      expect(area()?.classList.contains('relative') ?? false).toBeTrue();
    });
  });

  describe('Portrait', () => {
    const portrait: () => HTMLImageElement | null = 
      () => element.querySelector('.img-area>.portrait');

    it('should have protrait', () => {
      expect(portrait()).toBeTruthy();
    });

    it('should havv position buttom left', () => {
      expect(portrait()?.classList.contains('absolute') ?? false).toBeTrue();
      expect(portrait()?.classList.contains('bottom-0') ?? false).toBeTrue();
      expect(portrait()?.classList.contains('left-0') ?? false).toBeTrue();
    });

    it('should have full width', () => {
      expect(portrait()?.classList.contains('w-full') ?? false).toBeTrue();
    });

    it('should have correct source', () => {
      expect(portrait()?.src ?? '')
        .toBe('http://localhost:9876/assets/img/01_hero/me.png');
    });
  });

  describe('Flower', () => {
    const flower: () => HTMLImageElement | null =
      () => element.querySelector('.img-area>.flower');

    it('should have flover', () => {
      expect(flower()).toBeTruthy();
    });

    it('should have positon absolute', () => {
      expect(flower()?.classList.contains('absolute') ?? false).toBeTrue();
    });

    it('should have size 16rem on mobile', () => {
      expect(flower()?.classList.contains('w-64') ?? false).toBeTrue();
      expect(flower()?.classList.contains('h-64') ?? false).toBeTrue();
    });

    it('should have size 32rem on deskop', () => {
      expect(flower()?.classList.contains('lg:w-128') ?? false).toBeTrue();
      expect(flower()?.classList.contains('lg:h-128') ?? false).toBeTrue();
    });

    it('should be source correct', () => {
      expect(flower()?.src ?? '')
        .toBe('http://localhost:9876/assets/img/01_hero/flower.png');
    })
  });
});
