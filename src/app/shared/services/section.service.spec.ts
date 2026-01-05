import { TestBed } from '@angular/core/testing';
import { SectionService } from './section.service';
import { computed } from '@angular/core';
import { SectionType } from '../enums/section-type';

describe('SectionService', () => {
  let service: SectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correct computed section value', () => {
    const section = computed(() => service.section());

    service.section = SectionType.ABOUT;
    expect(section()).toBe(SectionType.ABOUT);

    service.section = SectionType.SKILLS;
    expect(section()).toBe(SectionType.SKILLS)
  });

  describe('Mobile', () => {
    it('should isMobile() true on mobile', () => {
      spyOnProperty(window, 'innerWidth').and.returnValue(672);
      window.dispatchEvent(new Event('resize'));
      expect(service.isMobile()).toBeTrue();
    });

    it('should isMobile() false on mobile', () => {
      spyOnProperty(window, 'innerWidth').and.returnValue(1024);
      window.dispatchEvent(new Event('resize'));
      expect(service.isMobile()).toBeFalse();
    });

    it('should couputed value corrct change', () => {
      const mobile = computed(() => service.mobile());

      service.mobile = true;
      expect(mobile()).toBeTrue();

      service.mobile = false;
      expect(mobile()).toBeFalse();
    });
  });
});
