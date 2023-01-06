import { InjectionToken, Type } from '@angular/core';
import { WidgetKind } from './enumerations';
import { AbstractWidget } from './widgets';

export const WIDGET_MAP = new InjectionToken<Map<WidgetKind, Type<AbstractWidget<unknown>>>>('WidgetMap');