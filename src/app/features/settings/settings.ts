import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';

import { LanguageSelector } from '@shared/components/language-selector/language-selector';

import { TRANSLATION_TOKENS } from '@Core/config/language.config';

import { AuthService } from '@Features/auth/auth.service';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule, InputText, Button, TranslatePipe, LanguageSelector],
  template: `
    <div class="settings-page">
      <header class="page-header">
        <h1 class="page-title">{{ tokens.SETTINGS.TITLE | translate }}</h1>
        <p class="page-subtitle">{{ tokens.SETTINGS.SUBTITLE | translate }}</p>
      </header>

      <section class="settings-card">
        <h2 class="card-title">{{ tokens.SETTINGS.PROFILE_SETTINGS | translate }}</h2>

        <form [formGroup]="profileForm" (ngSubmit)="onSaveProfile()">
          <div class="settings-grid">
            <div class="setting-item">
              <label for="profile-name">Full Name</label>
              <input id="profile-name" pInputText formControlName="name" />
            </div>

            <div class="setting-item">
              <label for="profile-email">Email Address</label>
              <input id="profile-email" type="email" pInputText formControlName="email" />
            </div>
          </div>

          <div class="save-section">
            @if (isSaved()) {
              <span class="saved-alert">Preferences saved successfully!</span>
            }
            <p-button
              [label]="tokens.SETTINGS.SAVE_PREFERENCES | translate"
              [disabled]="profileForm.invalid"
              type="submit"
            />
          </div>
        </form>
      </section>

      <section class="settings-card">
        <h2 class="card-title">{{ tokens.SETTINGS.LANGUAGE_AND_REGION | translate }}</h2>
        <div class="setting-item">
          <span class="setting-item-label">Active Display Language</span>
          <app-language-selector />
        </div>
      </section>
    </div>
  `,
  styleUrl: './settings.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Settings {
  private readonly authService = inject(AuthService);

  protected readonly tokens = TRANSLATION_TOKENS;
  protected readonly isSaved = signal(false);

  protected readonly profileForm = new FormGroup({
    name: new FormControl(this.authService.currentUser()?.name ?? 'Administrator', [
      Validators.required,
    ]),
    email: new FormControl(this.authService.currentUser()?.email ?? 'admin@template.dev', [
      Validators.required,
      Validators.email,
    ]),
  });

  protected onSaveProfile(): void {
    if (this.profileForm.invalid) return;

    this.isSaved.set(true);
    setTimeout(() => {
      this.isSaved.set(false);
    }, 3000);
  }
}
