import { TestBed } from '@angular/core/testing';
import { TranslationService } from './translation.service';
import { HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing'

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
});
