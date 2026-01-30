import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
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
});
