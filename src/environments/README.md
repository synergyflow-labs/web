# Environments (`src/environments`)

This directory houses build-time environment configurations for different deployment targets (development, staging, production).

## Files in this Directory

* **`environment.ts`**: The baseline environment contract and default values. Defines the TypeScript interface `Environment`.
* **`environment.development.ts`**: Configuration for local development. Used when running `ng serve` or local development builds.
* **`environment.production.ts`**: Optimized configuration for production deployments. Used during `ng build --configuration production`.

## What Belongs Here

* API endpoints (`apiUrl`).
* Feature flags and mock mode toggles (`useMockAuth`).
* Monitoring and error logging credentials (`sentryDsn`).
* Storage keys for local storage and cookies.
* Pagination and UI defaults (`defaultPageSize`, `debounceTimeMs`).

## What Does NOT Belong Here

* Secrets or private API keys (never commit secrets to client-side code).
* Complex business logic or service implementations.
* Component-specific configurations.

## How to Add a New Environment Variable

1. Update the `Environment` interface in `environment.ts`:
   ```typescript
   export interface Environment {
     // ... existing fields
     enableAnalytics: boolean;
   }
   ```
2. Add the value to `environment.ts`, `environment.development.ts`, and `environment.production.ts`.
3. If you want runtime validation for this variable, add an assertion rule in `src/app/core/config/app.settings.ts`.
