import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  template: `
    <article class="kpi-card" [class]="'theme-' + theme()">
      <div class="kpi-card__header">
        <span class="kpi-card__title">{{ title() }}</span>
        <div class="kpi-card__icon-wrapper" aria-hidden="true">
          <i [class]="icon()"></i>
        </div>
      </div>

      <div class="kpi-card__body">
        <span class="kpi-card__value">{{ value() }}</span>
        @if (caption()) {
          <span class="kpi-card__caption">{{ caption() }}</span>
        }
      </div>
    </article>
  `,
  styleUrl: './kpi-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpiCard {
  readonly title = input.required<string>();
  readonly value = input.required<string | number>();
  readonly icon = input.required<string>();
  readonly caption = input<string>();
  readonly theme = input<'primary' | 'cyan' | 'amber' | 'violet'>('primary');
}
