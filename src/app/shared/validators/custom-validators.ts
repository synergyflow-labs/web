import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  /**
   * Validates that trimmed string has at least minLength characters.
   */
  static trimMinLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || typeof control.value !== 'string') return null;

      const trimmedLength = control.value.trim().length;
      if (trimmedLength === 0) return null;

      return trimmedLength >= minLength
        ? null
        : { minlength: { requiredLength: minLength, actualLength: trimmedLength } };
    };
  }

  /**
   * Validates that trimmed string does not exceed maxLength characters.
   */
  static trimMaxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || typeof control.value !== 'string') return null;

      const trimmedLength = control.value.trim().length;
      return trimmedLength <= maxLength
        ? null
        : { maxlength: { requiredLength: maxLength, actualLength: trimmedLength } };
    };
  }

  /**
   * Validates password strength: upper, lower, number, special char.
   */
  static strongPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value || typeof value !== 'string') return null;

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value);

      const isValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;
      return !isValid
        ? { strongPassword: { hasUpperCase, hasLowerCase, hasNumeric, hasSpecial } }
        : null;
    };
  }

  /**
   * Cross-field validator ensuring two controls have matching values (e.g. password & confirm password).
   */
  static match(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl): ValidationErrors | null => {
      const control = abstractControl.get(controlName);
      const matchingControl = abstractControl.get(matchingControlName);

      if (!control || !matchingControl) return null;

      if (matchingControl.errors && !matchingControl.errors['matching']) {
        return null;
      }

      if (control.value !== matchingControl.value) {
        const error = { matching: true };
        matchingControl.setErrors(error);
        return error;
      } else {
        matchingControl.setErrors(null);
        return null;
      }
    };
  }
}
