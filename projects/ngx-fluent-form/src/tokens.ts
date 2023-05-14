import { InjectionToken, Type } from '@angular/core';
import { DirectiveQueryContainer, FluentConfig } from './interfaces';
import { AbstractWidget } from './widgets';

export const WIDGET_MAP = new InjectionToken<Map<string, Type<AbstractWidget<unknown>>>>('WidgetMap');

export const CONFIG = new InjectionToken<FluentConfig>('FluentConfig');

export const DIRECTIVE_QUERY_CONTAINER = new InjectionToken<DirectiveQueryContainer>('DirectiveQueryContainer');
