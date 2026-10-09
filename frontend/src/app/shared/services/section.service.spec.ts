import { TestBed } from '@angular/core/testing';
import { SectionService } from './section.service';
import { computed } from '@angular/core';
import { SectionType } from '../enums/section-type';

function setWindowWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    writable: true,
    value: width
  })
}

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
});
