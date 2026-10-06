# GitHub Workflows & Automation (`.github`)

This directory houses continuous integration pipelines and repository configuration.

## Workflows

* **`workflows/ci.yml`**: Triggers on pull requests and pushes to `main`.
  * Installs dependencies (`npm ci`).
  * Runs TypeScript and template linter (`npm run lint`).
  * Verifies code formatting standards (`npm run format:check`).
  * Lints stylesheets with Stylelint (`npm run lint:css`).
  * Compiles production build (`npm run build`).
  * Executes unit test suite with coverage (`npm run test:coverage`).
