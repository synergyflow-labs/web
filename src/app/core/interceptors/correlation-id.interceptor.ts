import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

let sessionCorrelationId: string | null = null;

function getOrCreateCorrelationId(): string {
  if (!sessionCorrelationId) {
    sessionCorrelationId =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : 'corr-' + Math.random().toString(36).substring(2, 15);
  }
  return sessionCorrelationId;
}

/**
 * Functional HTTP interceptor that injects distributed tracing headers:
 * - X-Correlation-ID: Unique per-session or per-request ID.
 * - X-Referrer: Current Angular route URL.
 */
export const correlationIdInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const router = inject(Router, { optional: true });
  const correlationId = getOrCreateCorrelationId();

  let headers = req.headers.set('X-Correlation-ID', correlationId);
  if (router?.url) {
    headers = headers.set('X-Referrer', router.url);
  }

  return next(req.clone({ headers }));
};
