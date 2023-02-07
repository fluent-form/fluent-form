import { TemplateRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { Cell } from './types';

/** @internal */
interface Tooltip {
  title: string | TemplateRef<void>;
  icon: string | NzFormTooltipIcon;
}

/** @internal */
interface Label {
  value: string;
  span?: Cell;
  tooltip?: string | Tooltip;
}

/** 带标签的 */
export interface Labelful {
  label?: string | Label;
}

export interface Col {
  span?: Cell;
  offset?: Cell;
  flex?: number | string;
}

export interface CallbackArgs<S> {
  schema: S;
  /** 如果当前没有对应的 control，会返回上一级的 control，这时候一般是 form group/array */
  control: AbstractControl;
  model: SafeAny;
}
