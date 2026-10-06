import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { firstValueFrom } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { APP_SETTINGS, appSettings } from '@Core/config/app.settings';
import { UserRole } from '@Core/config/role.config';

import { AuthService } from './auth.service';

describe('AuthService (Mock Mode)', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        {
          provide: APP_SETTINGS,
          useValue: { ...appSettings, useMockAuth: true },
        },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should initialize unauthenticated when storage is empty', () => {
    expect(service.isAuthenticated()).toBe(false);
    expect(service.currentUser()).toBeNull();
  });

  it('should authenticate user and store token on valid login', async () => {
    const user = await firstValueFrom(
      service.login({
        email: 'admin@template.dev',
        password: 'Admin@123',
        role: UserRole.Admin,
      }),
    );

    expect(user).toBeDefined();
    expect(user.role).toBe(UserRole.Admin);
    expect(service.isAuthenticated()).toBe(true);
    expect(service.getAccessToken()).toContain('mock-jwt-token');
  });

  it('should clear session on logout', async () => {
    await firstValueFrom(
      service.login({
        email: 'user@template.dev',
        password: 'Admin@123',
      }),
    );
    expect(service.isAuthenticated()).toBe(true);

    service.clearSession();
    expect(service.isAuthenticated()).toBe(false);
    expect(service.currentUser()).toBeNull();
    expect(service.getAccessToken()).toBeNull();
  });
});
