import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';

import { TRANSLATION_TOKENS } from '@Core/config/language.config';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, Button, TranslatePipe],
  template: `
    <div class="not-found-container">
      <span class="error-code">404</span>
      <h1 class="error-title">{{ tokens.COMMON.PAGE_NOT_FOUND | translate }}</h1>
      <p class="error-desc">The page you are looking for does not exist or may have been moved.</p>
      <p-button
        [label]="tokens.COMMON.GO_BACK_HOME | translate"
        routerLink="/dashboard"
        icon="pi pi-home"
      />
    </div>
  `,
  styleUrl: './not-found.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {
  protected readonly tokens = TRANSLATION_TOKENS;
}
