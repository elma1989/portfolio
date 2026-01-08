import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaComponent } from './social-media.component';

describe('SocialMediaComponent', () => {
  let component: SocialMediaComponent;
  let fixture: ComponentFixture<SocialMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialMediaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 images', () => {
    const imgs = fixture.nativeElement.querySelectorAll('img');
    expect(imgs.length).toBe(3);
  });

  it('should have 3 links', () => {
    const links = fixture.nativeElement.querySelectorAll('a');
    expect(links.length).toBe(3);
  });

  it('should all links have target blank', () => {
    const links: NodeListOf<HTMLAnchorElement> = fixture.nativeElement.querySelectorAll('a');
    const allBlank: boolean = [...links].every(link => link.target == '_blank');
    expect(allBlank).toBeTrue();
  });
});
