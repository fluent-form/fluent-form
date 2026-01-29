import { InjectionToken, type TemplateRef, type Type } from '@angular/core';
import type { SafeAny } from '@ngify/core';
import type { AbstractFormContentComponent, AbstractWidgetWrapper } from './components';
import type { SchemaConfig } from './interfaces';
import type { AbstractWidget } from './widgets/widget';

declare const ngDevMode: boolean | undefined;

export const WIDGET_MAP = new InjectionToken<Map<string, () => Promise<Type<AbstractWidget<unknown>>>>>(
  typeof ngDevMode !== 'undefined' && ngDevMode ? 'WIDGET_MAP' : ''
);

export const SCHEMA_MAP = new InjectionToken<Map<string, SchemaConfig<SafeAny>>>(
  typeof ngDevMode !== 'undefined' && ngDevMode ? 'SCHEMA_MAP' : ''
);

export const NAMED_TEMPLATES = new InjectionToken<{ name: string, templateRef: TemplateRef<SafeAny> }[]>(
  typeof ngDevMode !== 'undefined' && ngDevMode ? 'NAMED_TEMPLATES' : ''
);

export const FLUENT_FORM_CONTENT = new InjectionToken<Type<AbstractFormContentComponent>>(
  typeof ngDevMode !== 'undefined' && ngDevMode ? 'FLUENT_FORM_CONTENT' : ''
);
export const FLUENT_WIDGET_WRAPPER = new InjectionToken<Type<AbstractWidgetWrapper>[]>(
  typeof ngDevMode !== 'undefined' && ngDevMode ? 'FLUENT_WIDGET_WRAPPER' : ''
);
