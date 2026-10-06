import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';

import { TRANSLATION_TOKENS } from '@Core/config/language.config';

@Component({
  selector: 'app-operation-failed',
  imports: [Button, TranslatePipe],
  template: `
    <div class="operation-failed" role="alert">
      <i class="pi pi-exclamation-triangle operation-failed__icon" aria-hidden="true"></i>
      <div class="operation-failed__content">
        <ng-content />
      </div>
      @if (showRetry()) {
        <p-button
          [label]="tokens.COMMON.RETRY | translate"
          [outlined]="true"
          (onClick)="retry.emit()"
          icon="pi pi-refresh"
          severity="danger"
          size="small"
        />
      }
    </div>
  `,
  styleUrl: './operation-failed.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationFailed {
  protected readonly tokens = TRANSLATION_TOKENS;

  readonly showRetry = input<boolean>(false);
  readonly retry = output<void>();
}
