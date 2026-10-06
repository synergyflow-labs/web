# Static Assets (`public`)

This directory contains static, uncompiled assets served directly at the root URL of the application.

## Directory Structure

```text
public/
├── assets/
│   └── i18n/
│       ├── en.json       # English translations
│       └── ar.json       # Arabic translations
├── favicon.svg           # Application favicon
├── logo-icon.svg         # High-resolution brand emblem
└── README.md             # This guide
```

## How to Add New Translations

1. Add your new key in `assets/i18n/en.json`.
2. Add the corresponding translation in `assets/i18n/ar.json`.
3. Add the strongly-typed key path in `src/app/core/config/language.config.ts` (`TRANSLATION_TOKENS`).
