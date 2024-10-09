import { ValidatorFn, Validators } from '@angular/forms';
import { FluentFormWidgetConfig, SchemaType } from '@fluent-form/core';
import { ButtonComponentSchema, ButtonGroupComponentSchema, FormArraySchema, FormGroupSchema, InputGroupComponentSchema, NumberControlSchema, RangeControlSchema, TextControlSchema } from '../schemas';
import { ButtonGroupWidget } from './button-group/button-group.widget';
import { ButtonWidget } from './button/button.widget';
import { FormArrayWidget } from './form-array/form-array.widget';
import { FormGroupWidget } from './form-group/form-group.widget';
import { InputGroupWidget } from './input-group/input-group.widget';
import { InputWidget } from './input/input.widget';
import { NumberWidget } from './number/number.widget';
import { RangeWidget } from './range/range.widget';

export function useAllWidgets() {
  return [
    useTextWidget(),
    useRangeWidget(),
    useNumberWidget(),
    useInputGroupWidget(),
    useButtonWidget(),
    useButtonGroupWidget(),
    useFormGroupWidget(),
    useFormArrayWidget()
  ];
}

export function useTextWidget(): FluentFormWidgetConfig<TextControlSchema> {
  return {
    kind: 'text',
    type: SchemaType.Control,
    widget: InputWidget,
    validators: schema => {
      const validators: ValidatorFn[] = [];

      if (schema.type === 'email') {
        validators.push(Validators.email);
      }

      return validators;
    },
    patch: schema => schema
  };
}

export function useRangeWidget(): FluentFormWidgetConfig<RangeControlSchema> {
  return {
    kind: 'range',
    type: SchemaType.Control,
    widget: RangeWidget
  };
}

export function useNumberWidget(): FluentFormWidgetConfig<NumberControlSchema> {
  return {
    kind: 'number',
    type: SchemaType.Control,
    widget: NumberWidget
  };
}

export function useInputGroupWidget(): FluentFormWidgetConfig<InputGroupComponentSchema> {
  return {
    kind: 'input-group',
    type: SchemaType.ControlWrapper,
    widget: InputGroupWidget
  };
}

export function useButtonWidget(): FluentFormWidgetConfig<ButtonComponentSchema> {
  return {
    kind: 'button',
    type: SchemaType.Component,
    widget: ButtonWidget
  };
}

export function useButtonGroupWidget(): FluentFormWidgetConfig<ButtonGroupComponentSchema> {
  return {
    kind: 'button-group',
    type: SchemaType.ComponentWrapper,
    widget: ButtonGroupWidget
  };
}

export function useFormGroupWidget(): FluentFormWidgetConfig<FormGroupSchema> {
  return {
    kind: 'group',
    type: SchemaType.ControlGroup,
    widget: FormGroupWidget
  };
}

export function useFormArrayWidget(): FluentFormWidgetConfig<FormArraySchema> {
  return {
    kind: 'array',
    type: SchemaType.ControlArray,
    widget: FormArrayWidget
  };
}
