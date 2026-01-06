import { TestBed } from '@angular/core/testing';
import { TranslationService } from './translation.service';
import { HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing'
import { computed } from '@angular/core';

describe('TranslationService', () => {
  let service: TranslationService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TranslationService,
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(TranslationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should English default language', () => {
    expect(service.lang()).toBe('en');
  });

  it('should works with computed values', () => {
    const lang = computed(() => service.lang());

    service.lang = 'de';
    expect(lang()).toBe('de');

    service.lang = 'en';
    expect(lang()).toBe('en');
  });
});
