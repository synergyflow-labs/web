import { FormControl, FormGroup } from '@angular/forms';

import { describe, expect, it } from 'vitest';

import { CustomValidators } from './custom-validators';

describe('CustomValidators', () => {
  describe('trimMinLength', () => {
    it('should pass if trimmed text meets min length', () => {
      const validator = CustomValidators.trimMinLength(3);
      const control = new FormControl('  abc  ');
      expect(validator(control)).toBeNull();
    });

    it('should fail if trimmed text is shorter than min length', () => {
      const validator = CustomValidators.trimMinLength(3);
      const control = new FormControl('  ab  ');
      expect(validator(control)).toEqual({
        minlength: { requiredLength: 3, actualLength: 2 },
      });
    });
  });

  describe('strongPassword', () => {
    it('should pass with strong password', () => {
      const validator = CustomValidators.strongPassword();
      const control = new FormControl('Admin@123');
      expect(validator(control)).toBeNull();
    });

    it('should fail if missing uppercase or special character', () => {
      const validator = CustomValidators.strongPassword();
      const control = new FormControl('admin123');
      expect(validator(control)).not.toBeNull();
    });
  });

  describe('match', () => {
    it('should validate matching controls on form group', () => {
      const form = new FormGroup(
        {
          password: new FormControl('secret123'),
          confirmPassword: new FormControl('secret123'),
        },
        { validators: CustomValidators.match('password', 'confirmPassword') },
      );

      expect(form.valid).toBe(true);
    });

    it('should invalidate if values mismatch', () => {
      const form = new FormGroup(
        {
          password: new FormControl('secret123'),
          confirmPassword: new FormControl('different'),
        },
        { validators: CustomValidators.match('password', 'confirmPassword') },
      );

      expect(form.valid).toBe(false);
      expect(form.get('confirmPassword')?.errors).toEqual({ matching: true });
    });
  });
});
