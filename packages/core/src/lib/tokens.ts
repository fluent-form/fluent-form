import { InjectionToken, TemplateRef, Type } from '@angular/core';
import { SafeAny } from '@ngify/types';
import { AbstractFormContentComponent, AbstractFormItemContentComponent } from './components';
import { SchemaConfig } from './interfaces';
import { AbstractWidget } from './widgets/widget';

export const WIDGET_MAP = new InjectionToken<Map<string, Type<AbstractWidget<unknown>>>>('');

export const SCHEMA_MAP = new InjectionToken<Map<string, SchemaConfig<SafeAny>>>('');

export const NAMED_TEMPLATES = new InjectionToken<{ name: string, templateRef: TemplateRef<SafeAny> }[]>('');

export const FLUENT_FORM_CONTENT = new InjectionToken<Type<AbstractFormContentComponent>>('');
export const FLUENT_FORM_ITEM_CONTENT = new InjectionToken<Type<AbstractFormItemContentComponent>>('');
