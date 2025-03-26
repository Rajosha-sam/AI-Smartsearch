import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './Shared/Interceptor/auth.interceptor';
import { provideToastr } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(),provideHttpClient(withInterceptors([authInterceptor])),importProvidersFrom(BrowserAnimationsModule),
  provideToastr(
    {timeOut:3000,
      positionClass:'toast-top-right',
      preventDuplicates:true
    }
  )]
};
