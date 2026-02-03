import { Component, computed, inject, Signal } from '@angular/core';
import { SectionService } from '../shared/services/section.service';
import { HeaderComponent } from '../shared/components/header/header.component';
import { TranslatePipe } from '../shared/pipes/translate.pipe';
import { FooterComponent } from "../shared/components/footer/footer.component";

@Component({
  selector: 'privacy-policy',
  imports: [
    HeaderComponent,
    TranslatePipe,
    FooterComponent
],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css'
})
export class PrivacyPolicyComponent {
  private sec: SectionService = inject(SectionService);
  protected mobile: Signal<boolean> = computed(() => this.sec.mobile());
}
