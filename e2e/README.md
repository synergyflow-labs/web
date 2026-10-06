# End-to-End & Accessibility Testing (`e2e`)

This directory houses automated browser tests powered by **Playwright** and automated accessibility (WCAG 2.1 AA) audits using **`@axe-core/playwright`**.

## Directory Structure

```text
e2e/
├── accessibility/        # Axe-core automated accessibility audits
├── pages/                # Page Object Models (POM) encapsulating selectors
├── specs/                # Functional user flow E2E test specs
└── README.md             # This guide
```

## Running Tests

```bash
# Run all end-to-end tests
npm run test:e2e

# Run accessibility audits
npm run test:a11y

# Run with interactive Playwright UI
npx playwright test --ui
```

## Best Practices

* Use the **Page Object Model (POM)** pattern (`pages/`) to prevent UI selector drift.
* Run automated accessibility audits (`test:a11y`) on all newly added routes before shipping.
