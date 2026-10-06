# Core Configuration (`src/app/core/config`)

This directory centralizes cross-cutting application configuration, tokens, constants, and theme presets.

## Files in this Directory

* **`app.settings.ts`**: Defines the `APP_SETTINGS` InjectionToken and `validateSettings(settings)` runtime validation, ensuring required configuration values are populated before application initialization.
* **`language.config.ts`**: Supported languages (`en`, `ar`), RTL language utilities, and the strictly typed `TRANSLATION_TOKENS` tree used across templates and services.
* **`theme.config.ts`**: PrimeNG Aura preset configuration, mapping global CSS custom properties to component semantic tokens.
* **`role.config.ts`**: User role enumerations, default landing routes per role, and navigation menus.

## What Belongs Here

* Application-wide constants and enumerations.
* InjectionTokens for global parameters.
* Route definitions and navigation mappings.
* UI theme presets and typography tokens.

## What Does NOT Belong Here

* Dynamic state or mutable variables.
* Concrete business logic or HTTP calls.
* Feature-specific settings (those belong in `features/<feature-name>/`).
