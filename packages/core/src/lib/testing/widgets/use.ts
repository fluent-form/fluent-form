import { ValidatorFn, Validators } from '@angular/forms';
import { FluentFormWidgetFeature, SchemaType } from '@fluent-form/core';
import { ButtonComponentSchema, InputControlSchema } from '../schemas';
import { ButtonWidget } from './button/button.widget';
import { InputWidget } from './input/input.widget';

export function useAllWidgets() {
  return [
    useInputWidget(),
    useButtonWidget(),
  ];
}

export function useInputWidget(): FluentFormWidgetFeature<InputControlSchema> {
  return {
    kind: 'input',
    type: SchemaType.Control,
    widget: InputWidget,
    validators: schema => {
      const validators: ValidatorFn[] = [];

      if (schema.type === 'email') {
        validators.push(Validators.email);
      }

      return validators;
    }
  };
}

export function useButtonWidget(): FluentFormWidgetFeature<ButtonComponentSchema> {
  return {
    kind: 'button',
    type: SchemaType.Component,
    widget: ButtonWidget
  };
}

// export function useFormGroupWidget(): FluentFormWidgetFeature<FormGroupSchema> {
//   return {
//     kind: 'group',
//     type: SchemaType.ControlGroup,
//     widget: FormGroupWidget
//   };
// }
