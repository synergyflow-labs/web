# Shared Models (`src/app/shared/models`)

This directory houses domain-agnostic data models, DTO interfaces, and shared types.

## Files in this Directory

* **`user.model.ts`**: Core authenticated user entity interface (`User`).
* **`pagination.model.ts`**: Generic pagination structures (`PaginatedList<T>`, `PaginatedQuery`).

## Guidelines

* Keep interfaces declarative and lean.
* Domain-specific entities that belong exclusively to one feature (e.g. `Item` in `crud-example`) should be placed in `features/<feature>/models/` rather than here.
