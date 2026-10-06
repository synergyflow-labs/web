import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';

import { distinctUntilChanged } from 'rxjs';
import { map } from 'rxjs/operators';

import { SideBar } from '@Core/layout/sidebar/side-bar';
import { TopBar } from '@Core/layout/top-bar/top-bar';

@Component({
  selector: 'app-base-layout',
  imports: [RouterOutlet, TopBar, SideBar],
  template: `
    <div class="base-layout">
      <app-top-bar [isSidebarOpen]="isSidebarOpen()" (toggleMenu)="toggleSidebar()" />

      <div class="base-layout__body">
        @if (isMobile() && isSidebarOpen()) {
          <div
            class="base-layout__backdrop"
            (click)="toggleSidebar()"
            (keydown.escape)="toggleSidebar()"
            role="button"
            tabindex="0"
          ></div>
        }

        <app-side-bar
          class="base-layout__sidebar"
          [class.opened]="isMobile() && isSidebarOpen()"
          [class.collapsed]="!isMobile() && !isSidebarOpen()"
        />

        <main class="base-layout__content">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  styleUrl: './base-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseLayout {
  private readonly breakpointObserver = inject(BreakpointObserver);

  protected readonly isMobile = toSignal(
    this.breakpointObserver.observe(['(max-width: 767px)']).pipe(
      map((result) => result.matches),
      distinctUntilChanged(),
    ),
    { initialValue: false },
  );

  protected readonly isSidebarOpen = signal(true);

  constructor() {
    effect(() => {
      this.isSidebarOpen.set(!this.isMobile());
    });
  }

  protected toggleSidebar(): void {
    this.isSidebarOpen.update((state) => !state);
  }
}
