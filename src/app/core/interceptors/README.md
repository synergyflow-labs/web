# HTTP Interceptors (`src/app/core/interceptors`)

This directory contains functional HTTP interceptors executed on outgoing HTTP requests and incoming responses.

## Files in this Directory

* **`auth.interceptor.ts`**: Automatically appends the Bearer token (`Authorization: Bearer <token>`) to outgoing requests and seamlessly handles 401 Unauthorized responses with an automatic token refresh queue.
* **`correlation-id.interceptor.ts`**: Injects distributed tracing headers (`X-Correlation-ID`, `X-Referrer`) for end-to-end request observability across microservices.
* **`logging.interceptor.ts`**: Measures request duration and logs HTTP metrics during development.

## Registration

Interceptors are registered in `src/app/app.config.ts`:

```typescript
provideHttpClient(
  withFetch(),
  withInterceptors([
    authInterceptor,
    correlationIdInterceptor,
    loggingInterceptor,
  ])
)
```

## Best Practices

* Use functional interceptors (`HttpInterceptorFn`) rather than legacy class-based interceptors.
* Always clone the request (`req.clone()`) when mutating headers or parameters.
* Avoid business logic inside interceptors; delegate token management and session clearing to `AuthService`.
