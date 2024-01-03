import { InjectionToken, Type } from '@angular/core';
import { SafeAny } from '@ngify/types';
import { SchemaConfig, TemplateDirectiveContainer } from './interfaces';
import { AbstractWidget } from './widgets';

export const WIDGET_MAP = new InjectionToken<Map<string, Type<AbstractWidget<unknown>>>>('WidgetMap');

export const SCHEMA_MAP = new InjectionToken<Map<string, SchemaConfig<SafeAny>>>('SchemaMap');

export const TEMPLATE_DIRECTIVE_CONTAINER = new InjectionToken<TemplateDirectiveContainer>('TemplateDirectiveContainer');
