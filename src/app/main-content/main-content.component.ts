import { Component, computed, HostListener, inject, Signal } from '@angular/core';
import { SectionService } from '../shared/services/section.service';
import { CommonModule } from '@angular/common';
import { SectionType } from '../shared/enums/section-type';
import { HeroSectionComponent } from './hero-section/hero-section.component';

@Component({
  selector: 'app-main-content',
  imports: [
    CommonModule,
    HeroSectionComponent
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent {
  private sec: SectionService = inject(SectionService);
  protected mobile: Signal<boolean> = computed(() => this.sec.mobile());
  protected section: Signal<SectionType> = computed(() => this.sec.section());
  protected SectionType = SectionType;

  @HostListener('window:resize')
  onResize() {
    this.sec.mobile = this.sec.isMobile();
  }
}
