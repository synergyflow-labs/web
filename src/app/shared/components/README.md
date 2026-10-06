# Shared Components (`src/app/shared/components`)

This directory houses reusable, domain-agnostic "dumb" presentation components.

## Available Components

* **`ConfirmActionModal` (`confirm-action-modal/`)**: A security-focused confirmation dialog requiring users to type an exact phrase before authorizing sensitive or irreversible actions.
* **`FieldError` (`field-error/`)**: Accessible reactive form validation message container with `aria-live="polite"` and an icon indicator.
* **`KpiCard` (`kpi-card/`)**: Summary metric card with dynamic color theme variants (`primary`, `cyan`, `amber`, `violet`), title, value, and caption.
* **`LanguageSelector` (`language-selector/`)**: Dropdown selector populated with available languages, native translations, and globe icon.
* **`Logo` (`logo/`)**: Scalable SVG brand logo and text.
* **`NavigationButtons` (`navigation-buttons/`)**: Standardized previous/next step control group with loading indicators.
* **`OperationFailed` (`operation-failed/`)**: Accessible error state display with optional retry trigger.

## Component Design Principles

* Use **`ChangeDetectionStrategy.OnPush`** on all components.
* Use signal-based `input()`, `input.required()`, and `output()` APIs.
* Components here should be **presentational only** (receiving data via inputs, emitting events via outputs) and should not inject domain services.
