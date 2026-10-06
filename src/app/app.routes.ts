import { Routes } from '@angular/router';

import { authGuard } from '@Core/guards/auth.guard';
import { BaseLayout } from '@Core/layout/base-layout/base-layout';

import { Login } from '@Features/auth/login/login';
import { NotFound } from '@Features/not-found/not-found';

export const routes: Routes = [
  {
    path: 'auth/login',
    component: Login,
  },
  {
    path: '',
    component: BaseLayout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        data: {
          title: 'DASHBOARD.TITLE',
          breadcrumb: 'NAV.DASHBOARD',
        },
        loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'items',
        data: {
          title: 'ITEMS.TITLE',
          breadcrumb: 'NAV.ITEMS',
        },
        loadComponent: () =>
          import('./features/crud-example/crud-example').then((m) => m.CrudExample),
      },
      {
        path: 'settings',
        data: {
          title: 'SETTINGS.TITLE',
          breadcrumb: 'NAV.SETTINGS',
        },
        loadComponent: () => import('./features/settings/settings').then((m) => m.Settings),
      },
    ],
  },
  {
    path: '**',
    component: NotFound,
  },
];
