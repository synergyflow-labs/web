# Core Module (`src/app/core`)

The **Core** layer contains singleton services, cross-cutting configurations, HTTP interceptors, route guards, and top-level layout components.

## Directory Structure

```text
src/app/core/
├── breadcrumbs/          # Dynamic breadcrumb service and models
├── config/               # Settings tokens, validation, theme presets, role definitions
├── guards/               # Route authorization and authentication guards
├── interceptors/         # HTTP interceptors (JWT auth, tracing, logging)
├── layout/               # Master layout shell (BaseLayout, TopBar, SideBar)
├── services/             # Application-level services (Language, HeadTag, Window)
└── README.md             # This guide
```

## Architectural Guidelines

1. **Singletons Only**: Everything in `@Core` must be an application-wide singleton or global concern.
2. **One-Way Dependency Rule**:
   * `@Core` may import from `@shared` (for dumb components, utilities, and models).
   * `@Core` must **NEVER** import from `@Features` (features depend on Core, never the reverse).
3. **Registration**: Services in Core should provide themselves in `'root'` (`@Injectable({ providedIn: 'root' })`).
4. **Clean Abstractions**: Keep external third-party SDKs (such as Sentry, analytics, or native browser globals) wrapped in injectable services within Core.
