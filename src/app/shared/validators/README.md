# Custom Validators (`src/app/shared/validators`)

This directory contains reusable Reactive Forms validators.

## Available Validators

* **`CustomValidators.trimMinLength(n)`**: Validates length after trimming whitespace, avoiding false passes on whitespace-only inputs.
* **`CustomValidators.trimMaxLength(n)`**: Validates length after trimming whitespace.
* **`CustomValidators.strongPassword()`**: Enforces uppercase, lowercase, numeric, and special character rules.
* **`CustomValidators.match('fieldA', 'fieldB')`**: Cross-field comparison validator for confirmation inputs.

## Usage Example

```typescript
this.form = this.fb.group({
  username: ['', [Validators.required, CustomValidators.trimMinLength(3)]],
  password: ['', [Validators.required, CustomValidators.strongPassword()]],
  confirmPassword: ['', [Validators.required]],
}, {
  validators: CustomValidators.match('password', 'confirmPassword')
});
```
