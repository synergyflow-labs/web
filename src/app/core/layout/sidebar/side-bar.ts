import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { TranslatePipe } from '@ngx-translate/core';

import { Logo } from '@shared/components/logo/logo';

import { NAV_ITEMS } from '@Core/config/role.config';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe, Logo],
  template: `
    <aside class="side-bar" aria-label="Sidebar Navigation">
      <app-logo />

      <nav class="nav-group" aria-label="Main Navigation">
        @for (item of navItems; track item.id) {
          <a
            class="nav-link"
            [routerLink]="item.route"
            [routerLinkActiveOptions]="{ exact: item.route === '/dashboard' }"
            routerLinkActive="active"
          >
            <i [class]="item.icon" aria-hidden="true"></i>
            <span>{{ item.labelKey | translate }}</span>
          </a>
        }
      </nav>
    </aside>
  `,
  styleUrl: './side-bar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBar {
  protected readonly navItems = NAV_ITEMS;
}
