import { InjectionToken, Type } from '@angular/core';
import { SafeAny } from '@ngify/types';
import { FluentConfig } from './config';
import { DirectiveQueryContainer, SchemaConfig, SchemaPatcher } from './interfaces';
import { AbstractWidget } from './widgets';

export const WIDGET_MAP = new InjectionToken<Map<string, Type<AbstractWidget<unknown>>>>('WidgetMap');

export const SCHEMA_MAP = new InjectionToken<Map<string, SchemaConfig<SafeAny>>>('SchemaMap');

export const SCHEMA_PATCHERS = new InjectionToken<SchemaPatcher[]>('SchemaPatchers');

export const CONFIG = new InjectionToken<FluentConfig>('FluentConfig');

export const DIRECTIVE_QUERY_CONTAINER = new InjectionToken<DirectiveQueryContainer>('DirectiveQueryContainer');
