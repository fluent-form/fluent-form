import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import zhExtra from '@angular/common/locales/extra/zh';
import zh from '@angular/common/locales/zh';
import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideFluentForm, withStaticExpression } from '@fluent-form/core';
import { useAllWidgets, withZorro } from '@fluent-form/ui-zorro';
import { NG_DOC_DEFAULT_PAGE_PROCESSORS, NG_DOC_DEFAULT_PAGE_SKELETON, NgDocDefaultSearchEngine, provideMainPageProcessor, provideMermaid, provideNgDocApp, providePageSkeleton, provideSearchEngine } from '@ng-doc/app';
import { NG_DOC_ROUTING, provideNgDocContext } from '@ng-doc/generated';

registerLocaleData(zh, 'zh-CN', zhExtra);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'zh-CN' },
    provideClientHydration(),
    provideAnimationsAsync(),
    provideRouter(
      NG_DOC_ROUTING.concat({ path: '**', redirectTo: '/introduction' }),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
    ),
    provideHttpClient(
      withInterceptorsFromDi(),
      withFetch()
    ),
    provideNgDocContext(),
    provideNgDocApp(),
    provideSearchEngine(NgDocDefaultSearchEngine),
    providePageSkeleton(NG_DOC_DEFAULT_PAGE_SKELETON),
    provideMainPageProcessor(NG_DOC_DEFAULT_PAGE_PROCESSORS),
    provideMermaid(),
    provideFluentForm(
      withZorro(useAllWidgets()),
      withStaticExpression()
    )
  ],
};
