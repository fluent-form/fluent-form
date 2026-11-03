import { PlatformLocation } from '@angular/common';
import { ApplicationConfig, inject, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { NG_REQUEST_BASE_PATH } from '@ng-doc/ui-kit/tokens';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: NG_REQUEST_BASE_PATH,
      useFactory: () => inject(PlatformLocation).getBaseHrefFromDOM() || '/'
    }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
