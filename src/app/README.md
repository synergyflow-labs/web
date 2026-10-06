# Application Root (`src/app`)

This directory houses the root bootstrap component, application configuration, and top-level routing tree.

## Files in this Directory

* **`app.ts` / `app.html` / `app.css`**: The root standalone component hosting `<router-outlet />` and PrimeNG `<p-toast />`.
* **`app.config.ts`**: The application provider graph containing router setup with view transitions, HTTP client with interceptors, PrimeNG theme preset, i18n translation loader, and startup initializers.
* **`app.routes.ts`**: Master route declarations linking `/auth/login`, child layout routes under `BaseLayout`, and the wild card 404 fallback.
