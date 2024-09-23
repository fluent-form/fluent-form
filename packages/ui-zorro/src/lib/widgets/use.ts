import { ValidatorFn, Validators } from '@angular/forms';
import { FluentFormWidgetConfig, SchemaType, isNumber } from '@fluent-form/core';
import { AlertComponentSchema, ButtonComponentSchema, ButtonGroupComponentSchema, CardComponentSchema, CardsArraySchema, CascaderControlSchema, CheckboxControlSchema, CheckboxGroupControlSchema, DatePickerControlSchema, DateRangePickerControlSchema, FormArraySchema, FormGroupSchema, HeadingComponentSchema, InputGroupComponentSchema, NumberGroupComponentSchema, NumberInputControlSchema, RadioGroupControlSchema, RateControlSchema, SelectControlSchema, SliderControlSchema, SpaceComponentSchema, StepComponentSchema, StepsComponentSchema, TabComponentSchema, TabsArraySchema, TabsComponentSchema, TextControlSchema, TextareaControlSchema, TimePickerControlSchema, ToggleControlSchema, TreeSelectControlSchema } from '../schemas';
import { AlertWidget } from './alert/alert.widget';
import { ButtonGroupWidget } from './button-group/button-group.widget';
import { ButtonWidget } from './button/button.widget';
import { CardsArrayWidget } from './cards-array/cards-array.widget';
import { CascaderWidget } from './cascader/cascader.widget';
import { CheckboxGroupWidget } from './checkbox-group/checkbox-group.widget';
import { CheckboxWidget } from './checkbox/checkbox.widget';
import { DateRangeWidget } from './date-range/date-range.widget';
import { DateWidget } from './date/date.widget';
import { FormArrayWidget } from './form-array/form-array.widget';
import { FormGroupWidget } from './form-group/form-group.widget';
import { HeadingWidget } from './heading/heading.widget';
import { InputGroupWidget } from './input-group/input-group.widget';
import { NumberGroupWidget } from './number-group/number-group.widget';
import { NumberWidget } from './number/number.widget';
import { RadioGroupWidget } from './radio-group/radio-group.widget';
import { RateWidget } from './rate/rate.widget';
import { SelectWidget } from './select/select.widget';
import { SilderWidget } from './slider/silder.widget';
import { SpaceWidget } from './space/space.widget';
import { StepsWidget } from './steps/steps.widget';
import { TabsArrayWidget } from './tabs-array/tabs-array.widget';
import { TabsWidget } from './tabs/tabs.widget';
import { TextWidget } from './text/text.widget';
import { TextareaWidget } from './textarea/textarea.widget';
import { TimeWidget } from './time/time.widget';
import { ToggleWidget } from './toggle/toggle.widget';
import { TreeSelectWidget } from './tree-select/tree-select.widget';

export function useAllWidgets() {
  return [
    useTextWidget(),
    useTextareaWidget(),
    useNumberWidget(),
    useDateWidget(),
    useDateRangeWidget(),
    useTimeWidget(),
    useToggleWidget(),
    useSelectWidget(),
    useCascaderWidget(),
    useTreeSelectWidget(),
    useSliderWidget(),
    useRadioGroupWidget(),
    useCheckboxWidget(),
    useCheckboxGroupWidget(),
    useRateWidget(),
    useHeadingWidget(),
    useInputGroupWidget(),
    useNumberGroupWidget(),
    useSpaceWidget(),
    useButtonWidget(),
    useAlertWidget(),
    useStepsWidget(),
    useTabsWidget(),
    useFormGroupWidget(),
    useFormArrayWidget(),
    useTabsArrayWidget(),
    useCardsArrayWidget()
  ];
}

function validatorsOfTextControl(schema: TextControlSchema | TextareaControlSchema) {
  const validators: ValidatorFn[] = [];

  if (schema.length) {
    if (isNumber(schema.length)) {
      validators.push(
        Validators.minLength(schema.length),
        Validators.maxLength(schema.length)
      );
    } else {
      const { min, max } = schema.length;
      min && validators.push(Validators.minLength(min));
      max && validators.push(Validators.maxLength(max));
    }
  }

  return validators;
}

export function useTextWidget(): FluentFormWidgetConfig<TextControlSchema> {
  return {
    kind: 'text',
    type: SchemaType.Control,
    widget: TextWidget,
    validators: schema => {
      const validators = validatorsOfTextControl(schema);

      if (schema.type === 'email') {
        validators.push(Validators.email);
      }

      return validators;
    }
  };
}

export function useTextareaWidget(): FluentFormWidgetConfig<TextareaControlSchema> {
  return {
    kind: 'textarea',
    type: SchemaType.Control,
    widget: TextareaWidget,
    validators: validatorsOfTextControl
  };
}

export function useNumberWidget(): FluentFormWidgetConfig<NumberInputControlSchema> {
  return {
    kind: 'number',
    type: SchemaType.Control,
    widget: NumberWidget
  };
}

export function useDateWidget(): FluentFormWidgetConfig<DatePickerControlSchema> {
  return {
    kind: 'date',
    type: SchemaType.Control,
    widget: DateWidget,
    patch: schema => {
      schema.mapper ??= {
        parser: (value: string | number | Date) => value ? new Date(value) : null,
        formatter: value => {
          if (!value) return null;
          return schema.time ? value.getTime() : new Date(value).setHours(0, 0, 0, 0);
        }
      };
      return schema;
    }
  };
}

export function useDateRangeWidget(): FluentFormWidgetConfig<DateRangePickerControlSchema> {
  return {
    kind: 'date-range',
    type: SchemaType.Control,
    widget: DateRangeWidget,
    patch: schema => {
      schema.mapper ??= {
        parser: (value: [string | number | Date, string | number | Date]) => value?.map(o => new Date(o)) as [Date, Date] ?? null,
        formatter: value => {
          if (!value) return null;
          return value.map(date => schema.time ? date.getTime() : new Date(date).setHours(0, 0, 0, 0));
        }
      };
      return schema;
    }
  };
}

export function useTimeWidget(): FluentFormWidgetConfig<TimePickerControlSchema> {
  return {
    kind: 'time',
    type: SchemaType.Control,
    widget: TimeWidget,
    patch: schema => {
      schema.mapper ??= {
        parser: (value: string | number | Date) => value ? new Date(value) : null,
        formatter: value => value?.getTime() ?? null
      };
      return schema;
    }
  };
}

export function useToggleWidget(): FluentFormWidgetConfig<ToggleControlSchema> {
  return {
    kind: 'toggle',
    type: SchemaType.Control,
    widget: ToggleWidget
  };
}

export function useSelectWidget(): FluentFormWidgetConfig<SelectControlSchema> {
  return {
    kind: 'select',
    type: SchemaType.Control,
    widget: SelectWidget
  };
}

export function useCascaderWidget(): FluentFormWidgetConfig<CascaderControlSchema> {
  return {
    kind: 'cascader',
    type: SchemaType.Control,
    widget: CascaderWidget
  };
}

export function useTreeSelectWidget(): FluentFormWidgetConfig<TreeSelectControlSchema> {
  return {
    kind: 'tree-select',
    type: SchemaType.Control,
    widget: TreeSelectWidget
  };
}

export function useSliderWidget(): FluentFormWidgetConfig<SliderControlSchema> {
  return {
    kind: 'slider',
    type: SchemaType.Control,
    widget: SilderWidget
  };
}

export function useRadioGroupWidget(): FluentFormWidgetConfig<RadioGroupControlSchema> {
  return {
    kind: 'radio-group',
    type: SchemaType.Control,
    widget: RadioGroupWidget
  };
}

export function useCheckboxWidget(): FluentFormWidgetConfig<CheckboxControlSchema> {
  return {
    kind: 'checkbox',
    type: SchemaType.Control,
    widget: CheckboxWidget
  };
}

export function useCheckboxGroupWidget(): FluentFormWidgetConfig<CheckboxGroupControlSchema> {
  return {
    kind: 'checkbox-group',
    type: SchemaType.Control,
    widget: CheckboxGroupWidget,
    patch: schema => {
      const labelProperty = schema.config?.labelProperty ?? 'label';
      const valueProperty = schema.config?.valueProperty ?? 'value';
      const options = schema.options;

      schema.mapper ??= {
        parser: value => options.map(option => ({
          label: option[labelProperty],
          value: option[valueProperty],
          checked: !!value?.includes(option[valueProperty])
        })),
        formatter: value => value?.filter(o => o.checked).map(o => o.value)
      };

      return schema;
    }
  };
}

export function useRateWidget(): FluentFormWidgetConfig<RateControlSchema> {
  return {
    kind: 'rate',
    type: SchemaType.Control,
    widget: RateWidget
  };
}

export function useHeadingWidget(): FluentFormWidgetConfig<HeadingComponentSchema> {
  return {
    kind: 'heading',
    type: SchemaType.Component,
    widget: HeadingWidget,
    patch: schema => {
      schema.col ??= 12;
      return schema;
    },
  };
}

export function useInputGroupWidget(): FluentFormWidgetConfig<InputGroupComponentSchema> {
  return {
    kind: 'input-group',
    type: SchemaType.ControlWrapper,
    widget: InputGroupWidget
  };
}

export function useNumberGroupWidget(): FluentFormWidgetConfig<NumberGroupComponentSchema> {
  return {
    kind: 'number-group',
    type: SchemaType.ControlWrapper,
    widget: NumberGroupWidget
  };
}

export function useSpaceWidget(): FluentFormWidgetConfig<SpaceComponentSchema> {
  return {
    kind: 'space',
    type: SchemaType.ControlWrapper,
    widget: SpaceWidget
  };
}

export function useAlertWidget(): FluentFormWidgetConfig<AlertComponentSchema> {
  return {
    kind: 'alert',
    type: SchemaType.Component,
    widget: AlertWidget,
    patch: schema => {
      schema.col ??= 12;
      return schema;
    },
  };
}

export function useButtonWidget(): [FluentFormWidgetConfig<ButtonComponentSchema>, FluentFormWidgetConfig<ButtonGroupComponentSchema>] {
  return [
    {
      kind: 'button',
      type: SchemaType.Component,
      widget: ButtonWidget,
      patch: schema => {
        if (schema.variants?.block) {
          schema.col ??= 12;
        }
        return schema;
      }
    },
    {
      kind: 'button-group',
      type: SchemaType.ComponentWrapper,
      widget: ButtonGroupWidget
    }
  ];
}

export function useStepsWidget(): [FluentFormWidgetConfig<StepsComponentSchema>, FluentFormWidgetConfig<StepComponentSchema>] {
  return [
    {
      kind: 'steps',
      type: SchemaType.ComponentContainer,
      widget: StepsWidget
    },
    {
      kind: 'step',
      type: SchemaType.ComponentContainer,
    }
  ];
}

export function useTabsWidget(): [FluentFormWidgetConfig<TabsComponentSchema>, FluentFormWidgetConfig<TabComponentSchema>] {
  return [
    {
      kind: 'tabs',
      type: SchemaType.ComponentContainer,
      widget: TabsWidget
    },
    {
      kind: 'tab',
      type: SchemaType.ComponentContainer,
    }
  ];
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

export function useTabsArrayWidget(): FluentFormWidgetConfig<TabsArraySchema> {
  return {
    kind: 'tabs-array',
    type: SchemaType.ControlArray,
    widget: TabsArrayWidget
  };
}

export function useCardsArrayWidget(): [FluentFormWidgetConfig<CardsArraySchema>, FluentFormWidgetConfig<CardComponentSchema>] {
  return [
    {
      kind: 'cards-array',
      type: SchemaType.ControlArray,
      widget: CardsArrayWidget
    },
    {
      kind: 'card',
      type: SchemaType.ComponentContainer,
    }
  ];
}
