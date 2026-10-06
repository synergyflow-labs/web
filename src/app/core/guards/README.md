# Route Guards (`src/app/core/guards`)

This directory contains functional Angular route guards controlling route navigation, authentication, and authorization.

## Files in this Directory

* **`auth.guard.ts`**: Protects private routes by verifying authentication status via `AuthService`. Redirects unauthenticated requests to `/auth/login` while preserving the intended target URL.
* **`role.guard.ts`**: Higher-order guard factory (`roleGuard(UserRole.Admin)`) that verifies user permissions before allowing route matching.

## Best Practices

* Use modern **functional guards** (`CanActivateFn`, `CanMatchFn`) rather than class-based guards with `inject()`.
* Prefer `CanMatchFn` for lazy-loaded route trees so protected code bundles aren't downloaded if authorization fails.
* Return a `UrlTree` rather than calling `router.navigate()` imperatively inside guards.
