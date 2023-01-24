import { InjectionToken, Type } from '@angular/core';
import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { NzRowDirective } from 'ng-zorro-antd/grid';
import { WidgetKind } from './enumerations';
import { AbstractWidget } from './widgets';

export interface Config {
  layout: NzFormLayoutType;
  colon: boolean;
  gutter: NzRowDirective['nzGutter'];
}

export const WIDGET_MAP = new InjectionToken<Map<WidgetKind, Type<AbstractWidget<unknown>>>>('WidgetMap');
export const CONFIG = new InjectionToken<Config>('Config');