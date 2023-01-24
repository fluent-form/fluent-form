import { InjectionToken, Type } from '@angular/core';
import { FluentConfig } from './config';
import { AbstractWidget } from './widgets';
import { WidgetKind } from './widgets/kind';

export const WIDGET_MAP = new InjectionToken<Map<WidgetKind, Type<AbstractWidget<unknown>>>>('WidgetMap');
export const CONFIG = new InjectionToken<FluentConfig>('FluentConfig');