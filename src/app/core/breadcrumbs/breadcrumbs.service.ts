import { inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';

import { Breadcrumb } from './models/breadcrumb.model';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbsService {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly translate = inject(TranslateService);

  readonly breadcrumbs = signal<Breadcrumb[]>([]);

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.rebuildBreadcrumbs();
    });

    this.translate.onLangChange.subscribe(() => {
      this.rebuildBreadcrumbs();
    });
  }

  private rebuildBreadcrumbs(): void {
    const root = this.activatedRoute.root;
    const items: Breadcrumb[] = [];
    this.buildHierarchy(root, '', items);
    this.breadcrumbs.set(items);
  }

  private buildHierarchy(
    route: ActivatedRoute,
    currentUrl: string,
    breadcrumbs: Breadcrumb[],
  ): void {
    const children = route.children;
    if (children.length === 0) return;

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map((segment) => segment.path).join('/');
      let nextUrl = currentUrl;
      if (routeURL !== '') {
        nextUrl += `/${routeURL}`;
      }

      const breadcrumbKey = child.snapshot.data['breadcrumb'];
      if (breadcrumbKey) {
        const label = this.translate.instant(breadcrumbKey);
        breadcrumbs.push({ label, url: nextUrl });
      }

      this.buildHierarchy(child, nextUrl, breadcrumbs);
    }
  }
}
