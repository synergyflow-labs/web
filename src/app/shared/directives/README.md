# Shared Directives (`src/app/shared/directives`)

This directory contains reusable standalone DOM attributes and structural directives.

## Available Directives

* **`[appFadeInOnScroll]`**: Uses `IntersectionObserver` to trigger smooth reveal animations when elements scroll into the viewport. Supports configurable `[threshold]` and `[delay]` inputs.

## Usage Example

```html
<div appFadeInOnScroll [delay]="150" class="card">
  <!-- content smoothly fades and translates in -->
</div>
```
