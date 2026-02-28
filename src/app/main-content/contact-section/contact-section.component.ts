import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslationService } from '../../shared/services/translation.service';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SectionService } from '../../shared/services/section.service';
import { CommonModule } from '@angular/common';
import { SectionSelectorComponent } from '../../shared/components/section-selector/section-selector.component';
import { SectionType } from '../../shared/enums/section-type';
import { RouterLink } from "@angular/router";
import { CustomValidator } from '../../shared/classes/validators';

interface ContactForm {
  name: FormControl<string>;
  email: FormControl<string>;
  question: FormControl<string>;
  policy: FormControl<boolean>
}

type ControlName = keyof ContactForm;

type FormField = {
  name: ControlName,
  maxLength: number
}

@Component({
  selector: 'section[contact]',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    FooterComponent,
    CommonModule,
    SectionSelectorComponent,
    RouterLink
],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.css'
})
export class ContactSectionComponent implements OnInit {
  // #region Attributes
  private fb: FormBuilder = inject(FormBuilder);
  private ts: TranslationService = inject(TranslationService);
  private sec: SectionService = inject(SectionService);
  protected form = this.fb.nonNullable.group({
    name: ['', [Validators.required, CustomValidator.firstUpperCase(), Validators.minLength(2)]],
    email: ['', [Validators.required, CustomValidator.strongEmail(), Validators.minLength(5)]],
    question: ['', [Validators.required, Validators.minLength(10)]],
    policy: [false, [Validators.requiredTrue]]
  });
  private focusControl: WritableSignal<string | null> = signal<string | null>(null);
  protected checkboxHover: boolean = false;
  protected sent: WritableSignal<boolean> = signal<boolean>(false);
  protected desktop: Signal<boolean> = computed(() => !this.sec.mobile());
  protected fields: FormField[] = [
    { name: 'name', maxLength: 30 },
    { name: 'email', maxLength: 30 },
    { name: 'question', maxLength: 50 }
  ]

  ngOnInit(): void {
    this.loadValues();
    this.form.valueChanges.subscribe(() => {
      this.saveValues();
    });
  }
  // #endregion
  
  // #region Methods
  // #region Getter
  get checkboxImage(): string {
    let suffix: string = this.form.controls.policy.value 
      ? (this.checkboxHover ? '-checked-hover' : '-checked')
      : (this.checkboxHover ? '-hover' : '');
    return `assets/img/05_contact/check${suffix}.png`
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

    this.resetForm();
    this.sent.set(true);
  }
  
  /** Resets the form. */
  resetForm(): void {
    this.removeValues();
    this.form.reset();
  }


  /**
   * Gets a label from a control.
   * @param name Name of control.
   * @returns Label of control.
   */
  label(name: string): string {
    return this.ts.translate(`contact.labels.${name}`);
  }

  /**
   * Gets placeholder from control
   * @param name - Name of control.
   * @returns 
   */
  placeholder(name: string): string {
    return this.ts.translate(`contact.placeholder.${name}`);
  }
  // #endregion

  /**
   * Checks, if control has error.
   * @param name - Name of control.
   * @returns True, if control has error.
   */
  hasError(name: ControlName): boolean {
    return this.form.controls[name].touched && this.form.controls[name].invalid;
  }

  errorMessage(name: ControlName): string {
    const errors = this.form.controls[name].errors;
    const key: string = `contact.error.${name}`;
    if (!errors) return '';
    if (errors['required'])
      return this.ts.translate(key + '.required');
    if (errors['firstUpperCase'])
      return this.ts.translate(key + '.uppercase');
    if (errors['strongEmail'])
      return this.ts.translate(key + '.non-email');
    return this.ts.translate(key + '.minlength');
  }
  
  /** goes to hero-section. */
  goToHero() {
    this.sec.section = SectionType.HERO;
    if (!this.desktop()) {
      document.getElementById('hero')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
  // #endregion
}