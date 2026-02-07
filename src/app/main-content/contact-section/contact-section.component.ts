import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslationService } from '../../shared/services/translation.service';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SectionService } from '../../shared/services/section.service';
import { CommonModule } from '@angular/common';
import { SectionSelectorComponent } from '../../shared/components/section-selector/section-selector.component';

@Component({
  selector: 'section[contact]',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    FooterComponent,
    CommonModule,
    SectionSelectorComponent
  ],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.css'
})
export class ContactSectionComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private ts: TranslationService = inject(TranslationService);
  private sec: SectionService = inject(SectionService);
  protected form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    question: ['', Validators.required],
    policy: [false, Validators.requiredTrue]
  });
  private focusControl: WritableSignal<string | null> = signal<string | null>(null);
  protected checkboxHover: boolean = false;
  protected sent: WritableSignal<boolean> = signal<boolean>(false);
  protected desktop: Signal<boolean> = computed(() => !this.sec.mobile());

  ngOnInit(): void {
    this.loadValues();
    this.form.valueChanges.subscribe(() => {
      this.saveValues();
    });
  }

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

    if(this.email.errors?.['email']) {
      this.email.setValue('');
      return this.ts.translate('contact.error.email');
    }

    return '';
  }

  get questionPlaceholder() {
    if (!this.question.touched || !this.question.invalid)
      return this.ts.translate('contact.placeholder.question');

    if(this.question.errors?.['required'])
      return this.ts.translate('contact.error.question');

    return '';
  }

  get checkboxImage(): string {
    let suffix: string = this.form.controls.policy.value 
      ? (this.checkboxHover ? '-checked-hover' : '-checked')
      : (this.checkboxHover ? '-hover' : '');
    return `assets/img/05_contact/check${suffix}.png`
  }

  get errorPolicy(): string {
    return this.form.controls.policy.touched 
    && this.form.controls.policy.invalid
      ? this.ts.translate('contact.error.policy') : '';
  }

  get submitValue(): string {
    return this.ts.translate('contact.submit');
  }
  // #endregion

  // #region Focus
  /**
   * Sets focus on control.
   * @param name Name of control.
   */
  setFocus(name: string): void {
    this.focusControl.set(name);
    if(name =='email') this.email.reset();
  }

  /**
   * Usets focus from control.
   * @param name Name of control.
   */
  setBlur(name: string): void {
    if(name == this.focusControl()) {
      this.focusControl.set(null);
      this.trimControl(name);
    }
  }

  /**
   * Checks, if focus in on control.
   * @param name Name of form.
   * @returns True, if control is on focus.
   */
  isFocus(name: string): boolean {
    return name == this.focusControl();
  }
  // #endregion

  // #region Storage
  /** Saves form values in local storage. */
  private saveValues(): void {
    const values = Object.keys(this.form.controls)
      .map(key => ({
        [key]: this.form.get(key)?.value
      }))
      .reduce((acc, obj) => {
        return {...acc, ...obj}
      });
      localStorage.setItem('form', JSON.stringify(values));
  }

  /** Loads form values from local storage. */
  private loadValues(): void {
    const storage = localStorage.getItem('form');
    if(storage) {
      const values = JSON.parse(storage);
      Object.keys(values).forEach(key => {
        this.form.get(key)?.setValue(values[key]);
      });
    }
  }

  /** Removes form data from local storage */
  private removeValues(): void {
    localStorage.removeItem('form');
  }
  // #endregion

  // #region Form
  /**
   * Trims a control.
   * @param name Name of Control.
   */
  private trimControl(name: string) {
    const control = this.form.get(name);
    if(control && typeof control.value == 'string')
      control.setValue(control.value.trim());
  }

  /** Submits the form. */
  onSubmit(): void {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const {policy, ...data} = this.form.getRawValue();

    this.form.reset();
    this.sent.set(true);
  }

  resetForm(): void {
    this.removeValues();
    this.form.reset();
    this.sent.set(false);
  }
  // #endregion
}
