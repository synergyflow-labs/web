# Features Module (`src/app/features`)

The **Features** directory houses modular, domain-driven capability slices of the application.

## Directory Structure

```text
src/app/features/
├── auth/                 # Authentication, session, login UI
├── dashboard/            # Analytical charts, KPI summaries, recents
├── crud-example/         # Full enterprise CRUD pattern with SignalStore
├── settings/             # User preferences and localization settings
├── not-found/            # 404 page
└── README.md             # This guide
```

## Feature Architecture Pattern

Each feature directory should be self-contained:
* **`models/`**: Specific DTOs and models belonging solely to this domain.
* **`<feature>.service.ts`**: HTTP communications and backend interactions.
* **`<feature>.store.ts`**: State management using `@ngrx/signals` and `@StoreFeatures/with-request-status.feature`.
* **`ui/`**: Local dumb presentational subcomponents used within this feature.
* **`<feature>.ts` / `<feature>.html` / `<feature>.css`**: Smart container view component.
* **`<feature>.spec.ts`**: Vitest unit test suite.

## Golden Rules

1. **Lazy Loading**: Route entries should always lazy-load feature components via `loadComponent: () => import(...)`.
2. **Encapsulation**: Features should never import internal components or stores from sibling features. Communicate through `@Core` singletons or shared route parameters.
