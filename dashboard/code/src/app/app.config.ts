import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

export interface AppSettings {
  backendUrl: string;
}

export const APP_SETTINGS = new InjectionToken<AppSettings>('app.settings');

export const DEFAULT_APP_SETTINGS: AppSettings = {
  backendUrl: 'http://207.244.240.126:3000',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    { provide: APP_SETTINGS, useValue: DEFAULT_APP_SETTINGS },
  ]
};
