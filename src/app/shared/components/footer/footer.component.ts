import { Component, computed, inject, input, InputSignal, Signal } from '@angular/core';
import { SectionService } from '../../services/section.service';
import { CommonModule } from '@angular/common';

type Link = {
  name: string,
  path: string,
  target: string
}

@Component({
  selector: 'footer[app-footer]',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  impressum: InputSignal<boolean> = input<boolean>(false);
  private sec: SectionService = inject(SectionService);
  protected desktop: Signal<boolean> = computed(() => !this.sec.mobile());
  private links: Link[] = [
    {
      name: 'Portfolio',
      path: '/',
      target: '_self'
    }, {
      name: 'Impressum',
      path: '/impressum',
      target: '_self'
    }, {
      name: 'LinkedIn',
      path: 'https://de.linkedin.com',
      target: '_blank'
    }, {
      name: 'GitHub',
      path: 'https://github.com/elma1989',
      target: '_blank'
    }
  ];

  /**
   * Gets all visible links.
   * @returns All visible links.
   */
  visibleLinks(): Link[] {
    return this.links.filter(link =>
      link.name != (this.impressum() ? 'Impressum' : 'Portfolio')
    );
  }
}
