# Authentication Feature (`src/app/features/auth`)

This feature handles user authentication, session restoration, and login UI.

## Structure

* **`models/auth.model.ts`**: DTO interfaces for authentication requests, tokens, and responses.
* **`auth.service.ts`**: Injectable session manager utilizing Angular Signals. Features a dual-mode mechanism:
  * **Mock Mode (`useMockAuth: true`)**: Provides instant in-browser logins with simulated network delays without requiring a backend server.
  * **API Mode (`useMockAuth: false`)**: Calls your backend API endpoint (`POST /auth/login`, `POST /auth/refresh`).
* **`login/`**: Accessible login form styled with PrimeNG components, custom validation errors, and quick demo role switchers.

## Connecting to your API

1. Set `useMockAuth: false` in `src/environments/environment.ts`.
2. Configure `apiUrl` to point to your backend authentication endpoint.
3. If necessary, adjust the `LoginPayload` and `AuthResponse` models in `models/auth.model.ts` to match your server contracts.
