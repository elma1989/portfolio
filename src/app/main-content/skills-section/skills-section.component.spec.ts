import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsSectionComponent } from './skills-section.component';
import { Skill } from '../../shared/interfaces/skill';
import { SectionService } from '../../shared/services/section.service';
import { Signal, signal } from '@angular/core';
import { TranslationService } from '../../shared/services/translation.service';

const langSignal = signal<'en' | 'de'>('en');

const translationServiceMock = {
  get lang(): Signal<'en' | 'de'> { return langSignal.asReadonly(); },
  set lang(lang: 'en' | 'de') { langSignal.set(lang); },
  translate: (key: string) => `translated: ${key}`
};

describe('SkillsSectionComponent', () => {
  let component: SkillsSectionComponent;
  let fixture: ComponentFixture<SkillsSectionComponent>;
  let element: HTMLElement;
  let sec: SectionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsSectionComponent],
      providers: [
        {
          provide: TranslationService,
          useValue: translationServiceMock
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SkillsSectionComponent);
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

    it('should have padding 2 0 2 7 on desktop', () => {
      const elem: HTMLElement | null = area();
      expect(elem?.classList).toContain('lg:py-8');
      expect(elem?.classList).toContain('lg:pr-0');
      expect(elem?.classList).toContain('lg:pl-28');
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

    it('should have size 1.8rem on xs mobile', () => {
      expect(h1()?.classList).toContain('text-[1.8rem]/[1.8rem]');
    })

    it('should have size 2.25rem on mobile', () => {
      expect(h1()?.classList).toContain('min-[390px]:text-[2.25rem]/[2.25rem]');
    });

    it('should have size 4.5rem on desktop', () => {
      expect(h1()?.classList).toContain('lg:text-[4.5rem]/[4.5rem]');
    });

    it('should have content "translated: skills.title"', () => {
      expect(h1()?.textContent)
        .toBe('translated: skills.title');
    });
  });

  describe('Description', () => {
    const desc: () => HTMLDivElement | null =
      () => element.querySelector('.content-area>.desc');

    it('should have desc', () => {
      expect(desc()).toBeTruthy();
    });

    it('should have blue background', () => {
      expect(desc()?.classList).toContain('bg-blue');
    });

    it('should have full width om mobile', () => {
      expect(desc()?.classList).toContain('w-full');
    });

    it('should have width 38rem on desktop', () => {
      expect(desc()?.classList).toContain('lg:w-152');
    });

    it('should have 1rem padding on mobile', () => {
      expect(desc()?.classList).toContain('p-4');
    });

    it('should have padding 2rem on desksop', () => {
      expect(desc()?.classList).toContain('lg:p-8');
    });

    it('should have text-justifi and auto hyphens', () => {
      const elem: HTMLElement | null = desc();
      expect(elem?.classList).toContain('text-justify');
      expect(elem?.classList).toContain('hyphens-auto');
    });
  });

  describe('Skill Wrapper', () => {
    const wrapper: () => HTMLDivElement | null =
      () => element.querySelector('.content-area>.skill-wrapper');

    it('should have skill wrapper', () => {
      expect(wrapper()).toBeTruthy();
    });

    it('should have full width on mobile', () => {
      expect(wrapper()?.classList).toContain('w-full');
    });

    it('should have width 52rem on desktop', () => {
      expect(wrapper()?.classList).toContain('lg:w-208');
    });

    it('should have 0.75rem gap flex-wrap on mobile', () => {
      const elem: HTMLDivElement | null = wrapper();
      expect(elem?.classList).toContain('flex');
      expect(elem?.classList).toContain('flex-wrap');
      expect(elem?.classList).toContain('gap-3');
    });

    it('schould have gap 2rem on desktop', () => {
      expect(wrapper()?.classList).toContain('lg:gap-8');
    });

    it('should have self align right on desktop', () => {
      expect(wrapper()?.classList).toContain('lg:self-end');
    });
  });

  describe('Skill-Elements', () => {
    const skills: () => NodeListOf<HTMLDivElement> =
      () => element.querySelectorAll('.skill-wrapper>.skill');
    const imgWrapper: () => NodeListOf<HTMLDivElement> =
      () => element.querySelectorAll('.skill-wrapper .img-wrapper');

    it('should have 13 Skills', () => {
      expect(skills().length).toBe(13);
    });

    it('should have 5rem width 6rem height on mobile', () => {
      skills().forEach(skill => {
        expect(skill.classList).toContain('w-20');
        expect(skill.classList).toContain('h-24');
      });
    });

    it('should have have 6rem width, 8rem height on deskop', () => {
      skills().forEach(skill => {
        expect(skill.classList).toContain('lg:w-24');
        expect(skill.classList).toContain('lg:h-32');
      });
    });

    it('should have x-center, y-between, column', () => {
      skills().forEach(skill => {
        expect(skill.classList).toContain('flex');
        expect(skill.classList).toContain('justify-between');
        expect(skill.classList).toContain('items-center');
      });
    });

    it('Every skill should have img wrapper', () => {
      skills().forEach(skill => {
        const wrapper = skill.querySelector('.img-wrapper');
        expect(wrapper).toBeTruthy();
      });
    });

    it('Every skill wrapper should have size 5rem on mobile', () => {
      imgWrapper().forEach(imgW =>
        expect(imgW.classList).toContain('size-20')
      );
    });

    it('Every skill wrapper should have size 6rem on desktop', () => {
      imgWrapper().forEach(imgW =>
        expect(imgW.classList).toContain('lg:size-24')
      );
    });

    it('Every skill wrapper should have centered images', () => {
      imgWrapper().forEach(imgW => {
        expect(imgW.classList).toContain('flex');
        expect(imgW.classList).toContain('justify-center');
        expect(imgW.classList).toContain('items-center');
      });
    });
  });

  describe('Single-Skills', () => {
    const skills: Skill[] = [
      { name: 'HTML', img: 'html' },
      { name: 'CSS', img: 'css' },
      { name: 'Tailwind', img: 'tw' },
      { name: 'JavaScript', img: 'js' },
      { name: 'TypeScript', img: 'ts' },
      { name: 'Angular', img: 'ng' },
      { name: 'Firebase', img: 'fb' },
      { name: 'Git', img: 'git' },
      { name: 'REST-API', img: 'api' },
      { name: 'Scrum', img: 'scrum' },
      { name: 'Material Design', img: 'mat' },
      { name: 'Python', img: 'py' },
      { name: 'Flask', img: 'flask' }
    ];
    const imgs: () => NodeListOf<HTMLImageElement> =
      () => element.querySelectorAll('.skill-wrapper img');

    it('should have 13 images', () => {
      expect(imgs().length).toBe(13);
    });

    it('should have size 75%', () => {
      imgs().forEach(img => {
        expect(img.classList).toContain('w-3/4');
        expect(img.classList).toContain('h-3/4');
      });
    });

    it('should have full size on hover for desktop', () => {
      imgs().forEach(img =>
        expect(img.classList).toContain('lg:hover:size-full')
      );
    });

    it('should have corect source', () => {
      imgs().forEach((img, i) =>
        expect(img.src)
          .toBe(`http://localhost:9876/assets/img/03_skills/${skills[i].img}.png`)
      );
    });

    it('should have correct description', () => {
      const spans: NodeListOf<HTMLSpanElement> =
        element.querySelectorAll('.skill-wrapper span');
      spans.forEach((span, i) =>
        expect(span.textContent).toBe(skills[i].name)
      );
    });
  });

  describe('Overlay Button', () => {
    const olBtn: () => HTMLButtonElement | null =
      () => element.querySelector('.content-area>.btn-overlay');

    it('sould have overlay button', () => {
      expect(olBtn()).toBeTruthy();
    });

    it('should have size 7.5rem', () => {
      expect(olBtn()?.classList).toContain('size-30');
    });

    it('should open overlay on click mobile only', () => {
      const btn = olBtn();
      sec.mobile = false;
      component.closeOverlay();
      fixture.detectChanges();
      btn?.click();
      fixture.detectChanges()
      expect(component.overlay()).toBeFalse();

      sec.mobile = true;
      component.closeOverlay();
      fixture.detectChanges();
      btn?.click();
      fixture.detectChanges()
      expect(component.overlay()).toBeTrue();
    });

    it('should have position relative', () => {
      expect(olBtn()?.classList).toContain('relative');
    });
  });

  describe('Overlay Flower', () => {
    const getFlower: () => HTMLImageElement | null =
      () => element.querySelector('.btn-overlay>.flower');

    it('should have flower-image', () => {
      expect(getFlower()).toBeTruthy();
    });

    it('should have full size', () => {
      expect(getFlower()?.classList).toContain('size-full');
    });

    it('sould be a circle', () => {
      expect(getFlower()?.classList).toContain('rounded-full');
    });

    it('should have positon top-left', () => {
      const flower = getFlower();
      expect(flower?.classList).toContain('absolute');
      expect(flower?.classList).toContain('top-0');
      expect(flower?.classList).toContain('left-0');
    });

    it('should have source "flower.png"', () => {
      expect(getFlower()?.src)
        .toBe('http://localhost:9876/assets/img/01_hero/flower.png');
    });
  })
});
