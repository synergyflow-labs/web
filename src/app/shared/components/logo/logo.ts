import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TranslatePipe } from '@ngx-translate/core';

import { TRANSLATION_TOKENS } from '@Core/config/language.config';

@Component({
  selector: 'app-logo',
  imports: [TranslatePipe],
  template: `
    <div class="brand-logo">
      <svg
        class="brand-icon"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="8" fill="url(#brandGrad)" />
        <path
          d="M9 16L14 21L23 11"
          stroke="white"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <defs>
          <linearGradient
            id="brandGrad"
            x1="0"
            y1="0"
            x2="32"
            y2="32"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#12A588" />
            <stop offset="1" stop-color="#209DB6" />
          </linearGradient>
        </defs>
      </svg>
      <span class="brand-text">{{ tokens.COMMON.BRAND_NAME | translate }}</span>
    </div>
  `,
  styleUrl: './logo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Logo {
  protected readonly tokens = TRANSLATION_TOKENS;
}
