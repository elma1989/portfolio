import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactSectionComponent } from './contact-section.component';

describe('ContactSectionComponent', () => {
  let component: ContactSectionComponent;
  let fixture: ComponentFixture<ContactSectionComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactSectionComponent);
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
      expect(content()?.classList).toContain('flex');
    });
  });

  describe('Content-Area', () => {
    const area: () => HTMLDivElement | null =
      () => element.querySelector('.content>.content-area');

    it('should have content-area', () => {
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

    it('should have padding 1rem om mobile', () => {
      expect(area()?.classList).toContain('p-4');
    });

    it('should have padding 2 0 0 7 on desktop', () => {
      const a = area();
      expect(a?.classList).toContain('lg:pt-8');
      expect(a?.classList).toContain('lg:pr-0');
      expect(a?.classList).toContain('lg:pb-0');
      expect(a?.classList).toContain('lg:pl-28');
    });

    it('should have gap 2rem column on mobile', () => {
      const a = area();
      expect(a?.classList).toContain('flex');
      expect(a?.classList).toContain('flex-col');
      expect(a?.classList).toContain('gap-8');
    });

    it('should have dirction row on desktop', () => {
      expect(area()?.classList).toContain('lg:flex-row');
    });
  });
});
