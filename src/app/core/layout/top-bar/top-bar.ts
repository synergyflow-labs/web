import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { TranslatePipe } from '@ngx-translate/core';

import { LanguageSelector } from '@shared/components/language-selector/language-selector';

import { BreadcrumbsService } from '@Core/breadcrumbs/breadcrumbs.service';
import { TRANSLATION_TOKENS } from '@Core/config/language.config';

import { AuthService } from '@Features/auth/auth.service';

@Component({
  selector: 'app-top-bar',
  imports: [RouterLink, TranslatePipe, LanguageSelector],
  template: `
    <header class="top-bar">
      <div class="top-bar__left">
        <button
          class="menu-toggle"
          [attr.aria-label]="
            (isSidebarOpen() ? tokens.COMMON.CLOSE_MENU : tokens.COMMON.OPEN_MENU) | translate
          "
          (click)="toggleMenu.emit()"
          type="button"
        >
          <i [class]="isSidebarOpen() ? 'pi pi-bars' : 'pi pi-bars'" aria-hidden="true"></i>
        </button>

        <nav class="breadcrumbs" aria-label="Breadcrumb">
          @for (item of breadcrumbs(); track item.url; let last = $last) {
            @if (!last) {
              <a class="breadcrumbs__item" [routerLink]="item.url">{{ item.label }}</a>
              <span class="breadcrumbs__separator" aria-hidden="true">/</span>
            } @else {
              <span class="breadcrumbs__active" aria-current="page">{{ item.label }}</span>
            }
          }
        </nav>
      </div>

      <div class="top-bar__right">
        <app-language-selector />

        @if (currentUser(); as user) {
          <div class="user-profile">
            <div class="user-avatar" aria-hidden="true">
              {{ userInitials() }}
            </div>
            <div class="user-info">
              <span class="user-name">{{ user.name }}</span>
              <span class="user-role">{{ user.role }}</span>
            </div>
            <button
              class="logout-btn"
              [attr.aria-label]="tokens.NAV.LOGOUT | translate"
              (click)="logout()"
              type="button"
            >
              <i class="pi pi-sign-out" aria-hidden="true"></i>
            </button>
          </div>
        }
      </div>
    </header>
  `,
  styleUrl: './top-bar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBar {
  private readonly authService = inject(AuthService);
  private readonly breadcrumbsService = inject(BreadcrumbsService);
  private readonly router = inject(Router);

  readonly isSidebarOpen = input<boolean>(true);
  readonly toggleMenu = output<void>();

  protected readonly tokens = TRANSLATION_TOKENS;
  protected readonly breadcrumbs = this.breadcrumbsService.breadcrumbs;
  protected readonly currentUser = this.authService.currentUser;

  protected readonly userInitials = computed(() => {
    const user = this.currentUser();
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  });

  protected logout(): void {
    this.authService.clearSession();
    this.router.navigate(['/auth/login']);
  }
}
