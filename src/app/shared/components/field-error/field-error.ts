import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-field-error',
  template: `
    <div class="field-error" [attr.id]="id()" aria-live="polite" role="status">
      <i class="pi pi-exclamation-circle" aria-hidden="true"></i>
      <ng-content />
    </div>
  `,
  styleUrl: './field-error.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldError {
  readonly id = input.required<string>();
}
