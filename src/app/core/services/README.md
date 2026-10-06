# Core Services (`src/app/core/services`)

This directory houses singleton services that provide application-level capabilities and platform integrations.

## Files in this Directory

* **`language.service.ts`**: Manages the active language signal (`currentLang`), text direction computed signal (`currentDir` -> `ltr` | `rtl`), localStorage persistence, document `lang` and `dir` attribute updates, and smooth animations using the native browser **View Transitions API**.
* **`head-tag.service.ts`**: Listens to router navigation events to dynamically update `<title>` and `<meta name="description">` tags utilizing translation tokens defined in route `data`.
* **`window.service.ts`**: SSR-safe abstraction around the native browser `window` object.

## Rules

* Services in this directory should be marked with `{ providedIn: 'root' }`.
* Never import feature-specific code into core services.
