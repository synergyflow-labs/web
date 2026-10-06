import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';

import { delay, map, Observable, of, tap, throwError } from 'rxjs';

import { User } from '@shared/models/user.model';

import { APP_SETTINGS } from '@Core/config/app.settings';
import { UserRole } from '@Core/config/role.config';

import { AuthResponse, LoginPayload, Token, UserDto } from './models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly appSettings = inject(APP_SETTINGS);

  private readonly _currentUser = signal<User | null>(null);
  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this._currentUser() !== null);

  private readonly tokenKey = this.appSettings.storage.accessTokenKey;
  private readonly userKey = this.appSettings.storage.currentUserKey;

  constructor() {
    this.restoreSession();
  }

  login(credentials: LoginPayload): Observable<User> {
    if (this.appSettings.useMockAuth) {
      return this.mockLogin(credentials);
    }

    return this.http
      .post<AuthResponse>(`${this.appSettings.apiBaseUrl}/auth/login`, credentials, {
        withCredentials: true,
      })
      .pipe(
        tap((res) => localStorage.setItem(this.tokenKey, res.token.accessToken)),
        map((res) => this.mapUser(res.user)),
        tap((user) => this.persistUser(user)),
      );
  }

  refreshAccessToken(expiredAccessToken: string): Observable<string> {
    if (this.appSettings.useMockAuth) {
      const refreshedToken = 'mock-jwt-refreshed-' + Date.now();
      localStorage.setItem(this.tokenKey, refreshedToken);
      return of(refreshedToken).pipe(delay(200));
    }

    return this.http
      .post<Token>(
        `${this.appSettings.apiBaseUrl}/auth/refresh`,
        { expiredAccessToken },
        { withCredentials: true },
      )
      .pipe(
        map((res) => res.accessToken),
        tap((newToken) => localStorage.setItem(this.tokenKey, newToken)),
      );
  }

  getAccessToken(): string | null {
    try {
      return localStorage.getItem(this.tokenKey);
    } catch {
      return null;
    }
  }

  clearSession(): void {
    try {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
    } catch {
      // Ignore storage errors in restricted contexts
    }
    this._currentUser.set(null);
  }

  private mockLogin(credentials: LoginPayload): Observable<User> {
    const isMockValid = credentials.password === 'Admin@123' || credentials.password.length >= 6;
    if (!isMockValid) {
      return throwError(() => new Error('Invalid credentials (try password: "Admin@123")'));
    }

    const role =
      credentials.email.includes('admin') || credentials.role === UserRole.Admin
        ? UserRole.Admin
        : UserRole.User;

    const mockUser: User = {
      id: 'usr-' + Math.random().toString(36).substring(2, 9),
      name: role === UserRole.Admin ? 'System Administrator' : 'Standard User',
      email: credentials.email,
      role,
    };

    const mockToken = 'mock-jwt-token-' + Date.now();
    try {
      localStorage.setItem(this.tokenKey, mockToken);
    } catch {
      // Storage unavailable
    }

    this.persistUser(mockUser);
    return of(mockUser).pipe(delay(350));
  }

  private mapUser(user: UserDto): User {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role === 'admin' ? UserRole.Admin : UserRole.User,
    };
  }

  private persistUser(user: User): void {
    try {
      localStorage.setItem(this.userKey, JSON.stringify(user));
    } catch {
      // Ignore
    }
    this._currentUser.set(user);
  }

  private restoreSession(): void {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const storedUser = localStorage.getItem(this.userKey);

      if (!token || !storedUser) {
        this.clearSession();
        return;
      }

      const user = JSON.parse(storedUser) as User;
      this._currentUser.set(user);
    } catch {
      this.clearSession();
    }
  }
}
