import { Component, inject, signal, WritableSignal } from '@angular/core';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslationService } from '../../shared/services/translation.service';

@Component({
  selector: 'section[contact]',
  imports: [
    TranslatePipe,
    ReactiveFormsModule
  ],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.css'
})
export class ContactSectionComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private ts: TranslationService = inject(TranslationService);
  protected form = this.fb.nonNullable.group({
    name: ['', Validators.required, Validators.minLength(3)],
    email: ['', Validators.required],
    question: ['', Validators.required],
    policy: [false]
  });
  private focusControl: WritableSignal<string | null> = signal<string | null>(null);

  // #region Getter
  get name() { return this.form.controls.name; }

  get email() { return this.form.controls.email; }

  get question() { return this.form.controls.question; }

  get namePlaceholder() {
    if (!this.name.touched || !this.name.invalid)
      return this.ts.translate('contact.placeholder.name');

    if(this.name.errors?.['required'])
      return this.ts.translate('contact.error.name');

    return '';
  }

  get emailPlaceholder() {
    if (!this.email.touched || !this.email.invalid)
      return this.ts.translate('contact.placeholder.email');

    if(this.email.errors?.['required'])
      return this.ts.translate('contact.error.email');

    return '';
  }

  get questionPlaceholder() {
    if (!this.question.touched || !this.question.invalid)
      return this.ts.translate('contact.placeholder.question');

    if(this.email.errors?.['required'])
      return this.ts.translate('contact.error.question');

    return '';
  }
  // #endregion

  // #reqion Focus
  setFocus(name: string): void {
    this.focusControl.set(name);
  }

  setBlur(name: string): void {
    if(name == this.focusControl()) this.focusControl.set(null);
  }

  isFocus(name: string): boolean {
    return name == this.focusControl();
  }

  onSubmit() {

  }
}
