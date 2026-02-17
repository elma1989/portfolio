import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidator {
    static strongEmail(): ValidatorFn {
        return (control: AbstractControl) => {
            const pattern: RegExp = /^\w+?\.?\-?\w+@+\w+\.\w{2,3}$/;
            const value = control.value;

            if(typeof value != 'string') return null;

            return pattern.test(value) ? null : { strongEmail: true };
        }
    }

    static firstUpperCase(): ValidatorFn {
        return (control: AbstractControl) => {
            const pattern: RegExp = /^[A-Z].*/;
            const value = control.value;

            if(typeof value != 'string') return null;

            return pattern.test(value) ? null : { firstUpperCase: true };
        }
    }
}