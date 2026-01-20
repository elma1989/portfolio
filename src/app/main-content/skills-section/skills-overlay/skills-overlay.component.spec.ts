import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsOverlayComponent } from './skills-overlay.component';
import { SectionService } from '../../../shared/services/section.service';
import { Signal, signal } from '@angular/core';
import { TranslationService } from '../../../shared/services/translation.service';

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
});
