# Shared Module (`src/app/shared`)

The **Shared** layer contains stateless, presentation UI components, custom directives, validation logic, generic models, and utility functions that can be imported across any feature in the application.

## Directory Structure

```text
src/app/shared/
├── components/           # Reusable presentation components
├── directives/           # Reusable directives (e.g. scroll reveal)
├── models/               # Domain-agnostic models and DTO interfaces
├── styles/               # Global PrimeNG component style refinements
├── utils/                # Pure utility functions and chart helpers
├── validators/           # Custom reactive form validators
└── README.md             # This guide
```

## Golden Rules for Shared

1. **Stateless by Default**: Components in `@shared` must receive data through signals (`input()`) and emit actions through `output()`.
2. **No Feature Dependencies**: Never import from `@Features` inside `@shared`.
3. **Reusability Test**: Only place code here if it is generic enough to be used across at least two distinct features.
