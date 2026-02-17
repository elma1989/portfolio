import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InprintParagraphComponent } from './inprint-paragraph.component';

describe('InprintParagraphComponent', () => {
  let component: InprintParagraphComponent;
  let fixture: ComponentFixture<InprintParagraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InprintParagraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InprintParagraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
