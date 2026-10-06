import { HttpEventType, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

import { tap } from 'rxjs';

import { APP_SETTINGS } from '@Core/config/app.settings';

/**
 * Functional HTTP interceptor for request/response performance diagnostics.
 * Active in development or when enableDevTools is true.
 */
export const loggingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const appSettings = inject(APP_SETTINGS);
  if (!appSettings.enableDevTools) {
    return next(req);
  }

  const startTime = performance.now();
  return next(req).pipe(
    tap({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          const duration = (performance.now() - startTime).toFixed(1);
          console.debug(`[HTTP ${event.status}] ${req.method} ${req.url} (${duration}ms)`);
        }
      },
      error: (error) => {
        const duration = (performance.now() - startTime).toFixed(1);
        console.error(
          `[HTTP ERROR ${error.status || 'FAILED'}] ${req.method} ${req.url} (${duration}ms)`,
          error,
        );
      },
    }),
  );
};
