import { InjectionToken, Type } from '@angular/core';
import { FluentConfig } from './config';
import { AbstractWidget } from './widgets';

export const WIDGET_MAP = new InjectionToken<Map<string, Type<AbstractWidget<unknown>>>>('WidgetMap');
export const CONFIG = new InjectionToken<FluentConfig>('FluentConfig');
