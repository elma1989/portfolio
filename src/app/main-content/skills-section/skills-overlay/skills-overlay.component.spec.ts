import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsOverlayComponent } from './skills-overlay.component';
import { SectionService } from '../../../shared/services/section.service';
import { Signal, signal } from '@angular/core';
import { TranslationService } from '../../../shared/services/translation.service';
import { Skill } from '../../../shared/interfaces/skill';

const langSignal = signal<'en' | 'de'>('en');

const translationServiceMock = {
  get lang(): Signal<'en' | 'de'> { return langSignal.asReadonly(); },
  set lang(lang: 'en' | 'de') { langSignal.set(lang); },
  translate: (key: string) => `translated: ${key}`
};

describe('SkillsOverlayComponent', () => {
  let component: SkillsOverlayComponent;
  let fixture: ComponentFixture<SkillsOverlayComponent>;
  let element: HTMLElement;
  let sec: SectionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsOverlayComponent],
      providers: [
        {
          provide: TranslationService,
          useValue: translationServiceMock
        }
      ]
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

  describe('Header', () => {
    const header: () => HTMLElement | null =
      () => element.querySelector('header');

    it('should have header', () => {
      expect(header()).toBeTruthy();
    });

    it('should have full width', () => {
      expect(header()?.classList).toContain('w-full');
    });

    it('should be x-center', () => {
      expect(header()?.classList).toContain('text-center');
    });

    it('should be bold text', () => {
      expect(header()?.classList).toContain('font-bold');
    })

    it('should have font-size 1.5rem/2rem', () => {
      expect(header()?.classList).toContain('text-[1.5rem]/[2rem]');
    });

    it('should have content "translated skills.overlay-title"', () => {
      expect(header()?.textContent)
        .toBe('translated: skills.overlay-title');
    });
  });

  describe('Description', () => {
    const descElem: () => HTMLParagraphElement | null =
      () => element.querySelector('p');

    it('should have description', () => {
      expect(descElem()).toBeTruthy();
    });

    it('should have full width', () => {
      expect(descElem()?.classList).toContain('w-full');
    });

    it('should have justify text', () => {
      expect(descElem()?.classList).toContain('text-justify');
    });

    it('should have content "translated: skills.overlay-desc"', () => {
      expect(descElem()?.textContent)
        .toBe('translated: skills.overlay-desc');
    });
  });

  describe('Footer', () => {
    const footerElem: () => HTMLElement | null =
      () => element.querySelector('footer');

    it('should have footer', () => {
      expect(footerElem()).toBeTruthy();
    });

    it('should have full width', () => {
      expect(footerElem()?.classList).toContain('w-full')
    });

    it('sould be x-center', () => {
      const footer = footerElem();
      expect(footer?.classList).toContain('flex');
      expect(footer?.classList).toContain('justify-center');
    });

    it('should have gap 2.5rem', () => {
      expect(footerElem()?.classList).toContain('gap-10')
    });
  });

  describe('Skills', () => {
    const skills: () => NodeListOf<HTMLDivElement> =
      () => element.querySelectorAll('footer>.skill');
    
    it('should have 2 skills', () => {
      expect(skills().length).toBe(2);
    });

    it('should have width 3rem, height 4rem', () => {
      skills().forEach(skill => {
        expect(skill.classList).toContain('w-12');
        expect(skill.classList).toContain('h-16');
      });
    });

    it('should have space between column, center-x', () => {
      skills().forEach(skill => {
        expect(skill.classList).toContain('flex');
        expect(skill.classList).toContain('flex-col');
        expect(skill.classList).toContain('justify-between');
        expect(skill.classList).toContain('items-center');
      });
    });
  });

  describe('Skills Images and Descriptions', () => {
    const skills: Skill[] = [
      {name: 'React', img: 'react'},
      {name: 'Vue.js', img: 'vue'}
    ];
    const imgs: () => NodeListOf<HTMLImageElement> =
      () => element.querySelectorAll('footer img');
    const descs: () => NodeListOf<HTMLSpanElement> =
      () => element.querySelectorAll('footer span');

    it('should have 2 imgs, 2 descs',() => {
      expect(imgs().length).toBe(2);
      expect(descs().length).toBe(2);
    });

    it('Images should have size 2.5rem', () => {
      imgs().forEach(img => 
        expect(img.classList).toContain('size-10')
      );
    });

    it('Images should have correct sources', () => {
      imgs().forEach((img, i) =>
        expect(img.src)
          .toBe(`http://localhost:9876/assets/img/03_skills/${skills[i].img}.png`)
      );
    });

    it('Descriptions should be correct', () => {
      descs().forEach((desc, i) =>
        expect(desc.textContent).toBe(skills[i].name)
      );
    });
  });
});
