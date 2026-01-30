import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { SectionService } from '../../services/section.service';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let element: HTMLElement;
  let sec: SectionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
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

    it('should have content limiter', () => {
      expect(content()).toBeTruthy();
    });

    it('should have padding-x 1rem, bottom 2rem on mobile', () => {
      const con = content();
      expect(con?.classList).toContain('px-4');
      expect(con?.classList).toContain('pb-8');
    });

    it('should have padding-x 7rem desktop', () => {
      expect(content()?.classList).toContain('lg:px-28');
    })

    it('should have gap 1 column on mobile', () => {
      const con = content();
      expect(con?.classList).toContain('flex');
      expect(con?.classList).toContain('flex-col');
      expect(con?.classList).toContain('gap-4');
    });

    it('should have x-center on mobile', () => {
      expect(content()?.classList).toContain('items-center');
    });

    it('should have gap 0 row on desktop', () => {
      const con = content();
      expect(con?.classList).toContain('lg:flex-row');
      expect(con?.classList).toContain('lg:gap-0');
    });

    it('should have x-between, y-center on desktop', () => {
      expect(content()?.classList).toContain('lg:justify-between');
    });
  });

  describe('Spans', () => {
    const spans: () => NodeListOf<HTMLSpanElement> =
      () => element.querySelectorAll('.content>span');

    describe('Mobile', () => {
      beforeEach(() => {
        sec.mobile = true;
        fixture.detectChanges();
      });

      it('should have 1 span', () => {
        expect(spans().length).toBe(1);
      });

      it('should have content "© Marco Elste 2026"', () => {
        expect(spans()[0]?.textContent)
          .toBe('© Marco Elste 2026');
      });
    });

    describe('Desktop', () => {
      beforeEach(() => {
        sec.mobile = false;
        fixture.detectChanges();
      });

      it('should have 2 spans', () => {
        expect(spans().length).toBe(2);
      });

      it('first span should be empty', () => {
        expect(spans()[0]?.textContent).toBe('');
      });

      it('second span should have content "© Marco Elste 2026"', () => {
        expect(spans()[1]?.textContent)
          .toBe('© Marco Elste 2026');
      });
    });
  });

  describe('link-container', () => {
    const container: () => HTMLDivElement | null =
      () => element.querySelector('.content>.link-container');

    it('should have container', () => {
      expect(container()).toBeTruthy();
    });

    it('should have full width on mobile', () => {
      expect(container()?.classList).toContain('w-full');
    });

    it('should have auto-width on desktop', () => {
      expect(container()?.classList).toContain('lg:w-auto');
    });

    it('should have x-between on mobile', () => {
      const div = container();
      expect(div?.classList).toContain('flex');
      expect(div?.classList).toContain('justify-between');
    });

    it('should have align right, gap 2rem on desktop', () => {
      const div = container();
      expect(div?.classList).toContain('lg:justify-end');
      expect(div?.classList).toContain('lg:gap-8');
    });
  });
});
