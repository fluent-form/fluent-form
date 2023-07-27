import { Type } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { SchemaConfig } from '../interfaces';
import { AbstractSchema, AbstractTextControlSchema, ButtonComponentSchema, ButtonGroupComponentSchema, CascaderControlSchema, CheckboxControlSchema, CheckboxGroupControlSchema, DatePickerControlSchema, DateRangePickerControlSchema, FormArraySchema, FormGroupSchema, InputControlSchema, InputGroupComponentSchema, NumberInputControlSchema, RadioGroupControlSchema, RateControlSchema, SelectControlSchema, SliderControlSchema, StepComponentSchema, StepsComponentSchema, TabComponentSchema, TabsComponentSchema, TextareaControlSchema, TextComponentSchema, TimePickerControlSchema, ToggleControlSchema, TreeSelectControlSchema } from '../schemas';
import { SchemaKind, SchemaType } from '../schemas/interfaces';
import { SCHEMA_MAP, WIDGET_MAP } from '../tokens';
import { isNumber } from '../utils';
import { AbstractWidget, ButtonGroupWidget, ButtonWidget, CascaderWidget, CheckboxGroupWidget, CheckboxWidget, DateRangeWidget, DateWidget, FormArrayWidget, FormGroupWidget, InputGroupWidget, InputWidget, NumberWidget, RadioGroupWidget, RateWidget, RowWidget, SelectWidget, SilderWidget, StepsWidget, TabsWidget, TextareaWidget, TextWidget, TimeWidget, ToggleWidget, TreeSelectWidget } from '../widgets';
import { makeFluentFeature } from './helper';
import { FluentFormFeature, FluentFormFeatureKind } from './interface';

export interface FluentFormWidgetFeature<S extends AbstractSchema> extends SchemaConfig<S> {
  kind: string;
  widget?: Type<AbstractWidget<unknown>>;
}

export function withWidgets(...features: (FluentFormWidgetFeature<SafeAny> | FluentFormWidgetFeature<SafeAny>[])[]): FluentFormFeature<FluentFormFeatureKind.Widget> {
  const flattenedFeatures = features.flat();

  return makeFluentFeature(FluentFormFeatureKind.Widget, [
    {
      provide: WIDGET_MAP,
      useFactory: () => {
        const map: Map<string, Type<AbstractWidget<unknown>>> = new Map(
          flattenedFeatures.filter(feature => feature.widget).map(feature => [
            feature.kind,
            feature.widget!
          ])
        );

        // 添加内置的 widget
        map.set(SchemaKind.Row, RowWidget);

        return map;
      }
    },
    {
      provide: SCHEMA_MAP,
      useFactory: () => {
        const map: Map<string, SchemaConfig<SafeAny>> = new Map(
          flattenedFeatures.map(feature => [
            feature.kind,
            feature
          ])
        );

        // 添加内置的 schema
        map.set(SchemaKind.Row, { type: SchemaType.ComponentContainer });
        map.set(SchemaKind.Headless, { type: SchemaType.Control });
        map.set(SchemaKind.Template, { type: SchemaType.Component });

        return map;
      }
    }
  ]);
}

export function withAllWidgets(): FluentFormFeature<FluentFormFeatureKind.Widget> {
  return withWidgets(
    useInputWidget(),
    useInputGroupWidget(),
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
    useTextWidget(),
    useButtonWidget(),
    useStepsWidget(),
    useTabsWidget(),
    useFormGroupWidget(),
    useFormArrayWidget(),
  );
}

function validatorsOfTextControl(schema: AbstractTextControlSchema) {
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

export function useInputWidget(): FluentFormWidgetFeature<InputControlSchema> {
  return {
    kind: SchemaKind.Input,
    type: SchemaType.Control,
    widget: InputWidget,
    validators: schema => {
      const validators = validatorsOfTextControl(schema);

      if (schema.type === 'email') {
        validators.push(Validators.email);
      }

      return validators;
    }
  };
}

export function useInputGroupWidget(): FluentFormWidgetFeature<InputGroupComponentSchema> {
  return {
    kind: SchemaKind.InputGroup,
    type: SchemaType.ControlWrapper,
    widget: InputGroupWidget
  };
}

export function useTextareaWidget(): FluentFormWidgetFeature<TextareaControlSchema> {
  return {
    kind: SchemaKind.Textarea,
    type: SchemaType.Control,
    widget: TextareaWidget,
    validators: validatorsOfTextControl
  };
}

export function useNumberWidget(): FluentFormWidgetFeature<NumberInputControlSchema> {
  return {
    kind: SchemaKind.Number,
    type: SchemaType.Control,
    widget: NumberWidget
  };
}

export function useDateWidget(): FluentFormWidgetFeature<DatePickerControlSchema> {
  return {
    kind: SchemaKind.Date,
    type: SchemaType.Control,
    widget: DateWidget,
    patch: schema => {
      schema.mapper ??= {
        parser: (value: string | number | Date) => value ? new Date(value) : null,
        formatter: value => value?.getTime() ?? null
      };
      return schema;
    }
  };
}

export function useDateRangeWidget(): FluentFormWidgetFeature<DateRangePickerControlSchema> {
  return {
    kind: SchemaKind.DateRange,
    type: SchemaType.Control,
    widget: DateRangeWidget,
    patch: schema => {
      schema.mapper ??= {
        parser: (value: [string | number | Date, string | number | Date]) => value?.map(o => new Date(o)) as [Date, Date] ?? null,
        formatter: value => value?.map(o => o.getTime()) ?? null
      };
      return schema;
    }
  };
}

export function useTimeWidget(): FluentFormWidgetFeature<TimePickerControlSchema> {
  return {
    kind: SchemaKind.Time,
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

export function useToggleWidget(): FluentFormWidgetFeature<ToggleControlSchema> {
  return {
    kind: SchemaKind.Toggle,
    type: SchemaType.Control,
    widget: ToggleWidget
  };
}

export function useSelectWidget(): FluentFormWidgetFeature<SelectControlSchema> {
  return {
    kind: SchemaKind.Select,
    type: SchemaType.Control,
    widget: SelectWidget
  };
}

export function useCascaderWidget(): FluentFormWidgetFeature<CascaderControlSchema> {
  return {
    kind: SchemaKind.Cascader,
    type: SchemaType.Control,
    widget: CascaderWidget
  };
}

export function useTreeSelectWidget(): FluentFormWidgetFeature<TreeSelectControlSchema> {
  return {
    kind: SchemaKind.TreeSelect,
    type: SchemaType.Control,
    widget: TreeSelectWidget
  };
}

export function useSliderWidget(): FluentFormWidgetFeature<SliderControlSchema> {
  return {
    kind: SchemaKind.Slider,
    type: SchemaType.Control,
    widget: SilderWidget
  };
}

export function useRadioGroupWidget(): FluentFormWidgetFeature<RadioGroupControlSchema> {
  return {
    kind: SchemaKind.RadioGroup,
    type: SchemaType.Control,
    widget: RadioGroupWidget
  };
}

export function useCheckboxWidget(): FluentFormWidgetFeature<CheckboxControlSchema> {
  return {
    kind: SchemaKind.Checkbox,
    type: SchemaType.Control,
    widget: CheckboxWidget
  };
}

export function useCheckboxGroupWidget(): FluentFormWidgetFeature<CheckboxGroupControlSchema> {
  return {
    kind: SchemaKind.CheckboxGroup,
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

export function useRateWidget(): FluentFormWidgetFeature<RateControlSchema> {
  return {
    kind: SchemaKind.Rate,
    type: SchemaType.Control,
    widget: RateWidget
  };
}

export function useTextWidget(): FluentFormWidgetFeature<TextComponentSchema> {
  return {
    kind: SchemaKind.Text,
    type: SchemaType.Component,
    widget: TextWidget
  };
}

export function useButtonWidget(): [FluentFormWidgetFeature<ButtonComponentSchema>, FluentFormWidgetFeature<ButtonGroupComponentSchema>] {
  return [
    {
      kind: SchemaKind.Button,
      type: SchemaType.Component,
      widget: ButtonWidget
    },
    {
      kind: SchemaKind.ButtonGroup,
      type: SchemaType.ComponentWrapper,
      widget: ButtonGroupWidget
    }
  ];
}

export function useStepsWidget(): [FluentFormWidgetFeature<StepsComponentSchema>, FluentFormWidgetFeature<StepComponentSchema>] {
  return [
    {
      kind: SchemaKind.Steps,
      type: SchemaType.ComponentContainer,
      widget: StepsWidget
    },
    {
      kind: SchemaKind.Step,
      type: SchemaType.ComponentContainer,
    }
  ];
}

export function useTabsWidget(): [FluentFormWidgetFeature<TabsComponentSchema>, FluentFormWidgetFeature<TabComponentSchema>] {
  return [
    {
      kind: SchemaKind.Tabs,
      type: SchemaType.ComponentContainer,
      widget: TabsWidget
    },
    {
      kind: SchemaKind.Tab,
      type: SchemaType.ComponentContainer,
    }
  ];
}

export function useFormGroupWidget(): FluentFormWidgetFeature<FormGroupSchema> {
  return {
    kind: SchemaKind.Group,
    type: SchemaType.ControlContainer,
    widget: FormGroupWidget
  };
}

export function useFormArrayWidget(): FluentFormWidgetFeature<FormArraySchema> {
  return {
    kind: SchemaKind.Array,
    type: SchemaType.ControlContainer,
    widget: FormArrayWidget
  };
}
