import { InjectionToken, QueryList, Type } from '@angular/core';
import { SafeAny } from '@ngify/types';
import { FluentTemplateDirective } from './directives';
import { SchemaConfig } from './interfaces';
import { AbstractWidget } from './widgets';

export const WIDGET_MAP = new InjectionToken<Map<string, Type<AbstractWidget<unknown>>>>('WidgetMap');

export const SCHEMA_MAP = new InjectionToken<Map<string, SchemaConfig<SafeAny>>>('SchemaMap');

export const TEMPLATE_DIRECTIVES = new InjectionToken<QueryList<FluentTemplateDirective>>('TemplateDirectives');
