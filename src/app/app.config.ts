import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';

import { APP_SETTINGS, appSettings, validateSettings } from '@Core/config/app.settings';
import { AppThemePreset } from '@Core/config/theme.config';
import { authInterceptor } from '@Core/interceptors/auth.interceptor';
import { correlationIdInterceptor } from '@Core/interceptors/correlation-id.interceptor';
import { loggingInterceptor } from '@Core/interceptors/logging.interceptor';
import { HeadTagService } from '@Core/services/head-tag.service';
import { LanguageService } from '@Core/services/language.service';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, correlationIdInterceptor, loggingInterceptor]),
    ),
    providePrimeNG({
      theme: {
        preset: AppThemePreset,
        options: {
          darkModeSelector: false,
          cssLayer: false,
        },
      },
    }),
    MessageService,
    {
      provide: APP_SETTINGS,
      useValue: appSettings,
    },
    provideAppInitializer(() => validateSettings(appSettings)),
    provideAppInitializer(() => inject(LanguageService).initLanguage()),
    provideAppInitializer(() => inject(HeadTagService).listenForRouteChange()),
    provideTranslateService({
      lang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json',
      }),
    }),
  ],
};
