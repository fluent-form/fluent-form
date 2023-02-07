import { TemplateRef } from '@angular/core';
import { AbstractControl, FormControlStatus } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
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

/** 控件事件变更 */
export interface ControlEventChange<Val> {
  valueChange?: (value: Val) => void;
  statusChange?: (status: FormControlStatus) => void;
}

/** 抽象的输入字段 */
export interface AbstractInputField<Placeholder extends string | [string, string] = string> {
  placeholder?: Placeholder;
  autofocus?: boolean;
  readonly?: boolean | ((args: CallbackArgs<AbstractInputField<Placeholder>>) => boolean) | string;
  size?: NzSizeLDSType;
  borderless?: boolean;
}
