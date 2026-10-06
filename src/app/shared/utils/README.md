# Shared Utilities (`src/app/shared/utils`)

This directory contains pure helper functions and data-formatting utilities.

## Files in this Directory

* **`utilities.ts`**: Pure functions for URL normalization, deep object cloning, debounce scheduling, and currency formatting.
* **`chart-colors.ts`**: Centralized color hex values mapped to theme design tokens for Chart.js integrations.

## Rules

* Utilities must be **pure functions** without side effects or implicit global dependencies.
* Every utility function added here must have a corresponding test in `utilities.spec.ts`.
