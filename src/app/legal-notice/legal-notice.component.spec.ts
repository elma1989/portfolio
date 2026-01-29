import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LegalNoticeComponent } from './legal-notice.component';
import { Signal, signal } from '@angular/core';
import { TranslationService } from '../shared/services/translation.service';

const langSignal = signal<'en' | 'de'>('en');

const translationServiceMock = {
  get lang(): Signal<'en' | 'de'> { return langSignal.asReadonly(); },
  set lang(lang: 'en' | 'de') { langSignal.set(lang); },
  translate: (key: string) => `translated: ${key}`
};

describe('LegalNoticeComponent', () => {
  let component: LegalNoticeComponent;
  let fixture: ComponentFixture<LegalNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalNoticeComponent],
      providers: [
        {
          provide: TranslationService,
          useValue: translationServiceMock
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LegalNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
