import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
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
export class ContactSectionComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private ts: TranslationService = inject(TranslationService);
  protected form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    question: ['', Validators.required],
    policy: [false, Validators.requiredTrue]
  });
  private focusControl: WritableSignal<string | null> = signal<string | null>(null);
  protected checkboxHover: boolean = false;

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

    return '';
  }

  get questionPlaceholder() {
    if (!this.question.touched || !this.question.invalid)
      return this.ts.translate('contact.placeholder.question');

    if(this.email.errors?.['required'])
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
  onSubmit() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.form.reset();
  }
  // #endregion
}
