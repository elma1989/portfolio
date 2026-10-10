import { Component, computed, inject, input, InputSignal, Signal } from '@angular/core';
import { SectionService } from '../../services/section.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'footer[app-footer]',
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  impressum: InputSignal<boolean> = input<boolean>(false);
  private sec: SectionService = inject(SectionService);
  protected desktop: Signal<boolean> = computed(() => !this.sec.mobile());
}
