import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';

import { FieldError } from '@shared/components/field-error/field-error';
import { Logo } from '@shared/components/logo/logo';
import { OperationFailed } from '@shared/components/operation-failed/operation-failed';

import { TRANSLATION_TOKENS } from '@Core/config/language.config';
import { UserRole } from '@Core/config/role.config';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    InputText,
    Password,
    Button,
    TranslatePipe,
    FieldError,
    OperationFailed,
    Logo,
  ],
  template: `
    <div class="login-container">
      <div class="login-card-wrapper">
        <div class="login-card">
          <div class="login-header">
            <app-logo />
            <h1 class="login-title">{{ tokens.AUTH.WELCOME_BACK | translate }}</h1>
            <p class="login-subtitle">{{ tokens.AUTH.LOGIN_SUBTITLE | translate }}</p>
          </div>

          @if (errorMessage()) {
            <app-operation-failed class="mb-4">
              {{ errorMessage() }}
            </app-operation-failed>
          }

          <form class="login-form" [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="email">{{ tokens.AUTH.EMAIL_LABEL | translate }}</label>
              <input
                id="email"
                [placeholder]="tokens.AUTH.EMAIL_PLACEHOLDER | translate"
                type="email"
                pInputText
                formControlName="email"
                aria-describedby="email-error"
              />
              @if (emailControl.invalid && (emailControl.dirty || emailControl.touched)) {
                <app-field-error id="email-error">
                  @if (emailControl.hasError('required')) {
                    {{ tokens.AUTH.EMAIL_REQUIRED | translate }}
                  } @else if (emailControl.hasError('email')) {
                    {{ tokens.AUTH.VALID_EMAIL | translate }}
                  }
                </app-field-error>
              }
            </div>

            <div class="form-group">
              <label for="password">{{ tokens.AUTH.PASSWORD_LABEL | translate }}</label>
              <p-password
                id="password"
                [placeholder]="tokens.AUTH.PASSWORD_PLACEHOLDER | translate"
                [feedback]="false"
                [toggleMask]="true"
                formControlName="password"
                styleClass="w-full"
                inputStyleClass="w-full"
                aria-describedby="password-error"
              />
              @if (passwordControl.invalid && (passwordControl.dirty || passwordControl.touched)) {
                <app-field-error id="password-error">
                  {{ tokens.AUTH.PASSWORD_REQUIRED | translate }}
                </app-field-error>
              }
            </div>

            <p-button
              [label]="tokens.AUTH.LOGIN_BUTTON | translate"
              [loading]="isLoading()"
              [disabled]="loginForm.invalid"
              type="submit"
              styleClass="w-full mt-2"
            />
          </form>

          <div class="demo-credentials-box">
            <span class="demo-title">
              <i class="pi pi-bolt" aria-hidden="true"></i>
              {{ tokens.AUTH.DEMO_NOTE | translate }}
            </span>
            <div class="demo-buttons">
              <p-button
                [outlined]="true"
                (onClick)="fillCredentials('admin@template.dev', 'Admin@123')"
                label="Admin"
                size="small"
                severity="secondary"
              />
              <p-button
                [outlined]="true"
                (onClick)="fillCredentials('user@template.dev', 'Admin@123')"
                label="User"
                size="small"
                severity="secondary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly tokens = TRANSLATION_TOKENS;
  protected readonly UserRole = UserRole;

  protected readonly isLoading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  protected readonly loginForm = new FormGroup({
    email: new FormControl('admin@template.dev', [Validators.required, Validators.email]),
    password: new FormControl('Admin@123', [Validators.required]),
  });

  protected get emailControl() {
    return this.loginForm.controls.email;
  }

  protected get passwordControl() {
    return this.loginForm.controls.password;
  }

  protected fillCredentials(email: string, pass: string): void {
    this.loginForm.patchValue({ email, password: pass });
    this.loginForm.markAsDirty();
  }

  protected onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { email, password } = this.loginForm.getRawValue();

    this.authService
      .login({
        email: email ?? '',
        password: password ?? '',
      })
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
          this.router.navigateByUrl(returnUrl);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set(err.message || 'Login failed');
        },
      });
  }
}
