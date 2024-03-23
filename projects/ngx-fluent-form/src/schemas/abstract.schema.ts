import { NgClass, NgStyle } from '@angular/common';
import { TemplateRef } from '@angular/core';
import { AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { AutocompleteDataSource } from 'ng-zorro-antd/auto-complete';
import { CompareWith, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzDateMode, SupportTimeOptions } from 'ng-zorro-antd/date-picker';
import { NzPlacement } from 'ng-zorro-antd/date-picker/date-picker.component';
import { FluentColDirective } from '../components';
import { AnySchema } from './index.schema';
import { Column, ControlEventListenerHolder, ControlValueMapper, Labelful, Length, MaybeSchemaReactiveFn, Row, SchemaLike } from './interfaces';
import { SchemaKey, SingleSchemaKey } from './types';

/**
 * @public
 * 抽象图示
 */
export interface AbstractSchema<Key extends SchemaKey = SchemaKey> extends SchemaLike<Key> {
  /* Used to define the width of the control. */
  col?: Column | FluentColDirective['span'];
  hidden?: MaybeSchemaReactiveFn<AbstractSchema, boolean>;
  class?: NgClass['ngClass'];
  style?: NgStyle['ngStyle'];
}

/**
 * @public
 * 抽象的真实控件图示
 */
export interface AbstractControlSchema<Key extends SchemaKey = SchemaKey, Val = SafeAny> extends AbstractSchema<Key>, Labelful {
  id?: string;
  /** I/O mapper for control */
  mapper?: ControlValueMapper<Val>;
  /* Used to set the default value of the control. */
  defaultValue?: SafeAny;
  /** Is it a required control */
  required?: MaybeSchemaReactiveFn<AbstractControlSchema<SchemaKey, Val>, boolean>;
  /** Whether to disable control */
  disabled?: MaybeSchemaReactiveFn<AbstractControlSchema<SchemaKey, Val>, boolean>;
  feedback?: boolean;
  hint?: string | TemplateRef<void>;
  /** Error message for control */
  tips?: {
    success?: string | TemplateRef<{ $implicit: FormControl<Val> }>;
    warning?: string | TemplateRef<{ $implicit: FormControl<Val> }>;
    error?: string | TemplateRef<{ $implicit: FormControl<Val> }>;
    validating?: string | TemplateRef<{ $implicit: FormControl<Val> }>;
    auto?: Record<'default' | (string & {}), Record<string, string>>;
  };
  /** Validator for the control */
  validators?: ValidatorFn[];
  /** Async validators for control */
  asyncValidators?: AsyncValidatorFn[];
  /** The event name for control to update upon. */
  updateOn?: AbstractControlOptions['updateOn'];
}

/**
 * @public
 * 抽象的容器控件图示
 */
export interface AbstractControlContainerSchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractSchema<Key>, ControlEventListenerHolder<SafeAny>, Row {
  schemas: AnySchema[];
  /** Validator for the control */
  validators?: ValidatorFn[];
  /** Async validators for control */
  asyncValidators?: AsyncValidatorFn[];
  /** The event name for control to update upon. */
  updateOn?: AbstractControlOptions['updateOn'];
}

/**
 * @public
 * 抽象的输入框图示
 */
export interface AbstractInputBoxControlSchema<Key extends SchemaKey, Val, P extends string | [string, string] = string> extends AbstractControlSchema<Key, Val> {
  placeholder?: P;
  autofocus?: boolean;
  readonly?: MaybeSchemaReactiveFn<AbstractInputBoxControlSchema<SchemaKey, Val, P>, boolean>;
  size?: NzSizeLDSType;
  borderless?: boolean;
}

/**
 * @public
 * 抽象的文本控件图示
 */
export interface AbstractTextControlSchema<Key extends SchemaKey = SchemaKey> extends AbstractInputBoxControlSchema<Key, string> {
  length?: Length;
  autocomplete?: {
    backfill?: boolean;
    options: AutocompleteDataSource;
    width?: number;
    compare?: CompareWith;
  };
}

/**
 * @public
 * 抽象的日期控件图示
 */
export interface AbstractDateControlSchema<Key extends SchemaKey, Val, P extends string | [string, string] = string> extends AbstractInputBoxControlSchema<Key, Val, P> {
  /** Mode of date picker control */
  mode?: NzDateMode;
  /** Show clean button */
  clearable?: boolean;
  /** Show time picker in date picker */
  time?: boolean | SupportTimeOptions;
  /** Date display format */
  format?: string;
  /** Inline mode */
  inline?: boolean;
  backdrop?: boolean;
  placement?: NzPlacement;
  today?: boolean;
  now?: boolean;
  suffixIcon?: string | TemplateRef<void>;
}
