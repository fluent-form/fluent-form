import { InjectionToken, Type } from '@angular/core';
import { WidgetType } from './enumerations';
import { AbstractWidget } from './widgets/abstract.widget';

export const WIDGET_MAP = new InjectionToken<Map<WidgetType, Type<AbstractWidget<unknown>>>>('WidgetMap');