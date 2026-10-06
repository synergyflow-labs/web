# Breadcrumbs (`src/app/core/breadcrumbs`)

This directory provides dynamic, hierarchical route breadcrumbs synchronized with the active route and translation service.

## Usage

In your route definitions (`app.routes.ts` or feature routes):

```typescript
{
  path: 'items',
  data: {
    breadcrumb: TRANSLATION_TOKENS.NAV.ITEMS,
    title: TRANSLATION_TOKENS.NAV.ITEMS,
  },
  loadComponent: () => import('./items/items').then(m => m.ItemsComponent),
}
```

The `BreadcrumbsService` automatically extracts `data['breadcrumb']`, resolves the translation, and exposes a reactive `breadcrumbs` signal of `{ label, url }[]`.
