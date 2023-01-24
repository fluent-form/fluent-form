import { InjectionToken, Type } from '@angular/core';
import { FluentConfig } from './config';
import { WidgetKind } from './enumerations';
import { AbstractWidget } from './widgets';

export const WIDGET_MAP = new InjectionToken<Map<WidgetKind, Type<AbstractWidget<unknown>>>>('WidgetMap');
export const CONFIG = new InjectionToken<FluentConfig>('FluentConfig');