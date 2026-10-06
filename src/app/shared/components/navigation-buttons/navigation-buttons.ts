import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';

import { TRANSLATION_TOKENS } from '@Core/config/language.config';

@Component({
  selector: 'app-navigation-buttons',
  imports: [Button, TranslatePipe],
  template: `
    <div class="navigation-buttons">
      @if (showBack()) {
        <p-button
          [label]="backLabel() || (tokens.COMMON.BACK | translate)"
          [outlined]="true"
          (onClick)="back.emit()"
          icon="pi pi-arrow-left"
          severity="secondary"
          type="button"
        />
      } @else {
        <div></div>
      }

      @if (showNext()) {
        <p-button
          [label]="nextLabel() || (tokens.COMMON.NEXT | translate)"
          [disabled]="isNextDisabled()"
          [loading]="isNextLoading()"
          (onClick)="next.emit()"
          icon="pi pi-arrow-right"
          iconPos="right"
          type="button"
        />
      }
    </div>
  `,
  styleUrl: './navigation-buttons.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationButtons {
  protected readonly tokens = TRANSLATION_TOKENS;

  readonly showBack = input<boolean>(true);
  readonly showNext = input<boolean>(true);
  readonly backLabel = input<string>();
  readonly nextLabel = input<string>();
  readonly isNextDisabled = input<boolean>(false);
  readonly isNextLoading = input<boolean>(false);

  readonly back = output<void>();
  readonly next = output<void>();
}
