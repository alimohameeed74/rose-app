import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ThemeService } from './core/services/theme/theme.service.js';
import { ConfigService } from './core/services/config/config.service.js';
import { authInterceptor } from './core/interceptors/auth/auth.interceptor.js';
import { errorInterceptor } from './core/interceptors/error/error.interceptor.js';
import { retryInterceptor } from './core/interceptors/retry/retry.interceptor.js';
import { MessageService } from 'primeng/api';
import { AuthService } from './features/auth/services/auth.service.js';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
        },
      },
    }),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, errorInterceptor, retryInterceptor]),
    ),
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withViewTransitions(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideAppInitializer(() => {
      const themeService = inject(ThemeService);
      return themeService.init();
    }),
    provideAppInitializer(() => {
      const configService = inject(ConfigService);
      return configService.loadConfig();
    }),
  ],
};
