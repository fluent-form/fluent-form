import { Type } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { SchemaConfig } from '../interfaces';
import { AbstractSchema, ButtonComponentSchema, ButtonGroupComponentSchema, CascaderControlSchema, CheckboxControlSchema, CheckboxGroupControlSchema, DatePickerControlSchema, DateRangePickerControlSchema, FormArraySchema, FormGroupSchema, InputControlSchema, InputGroupComponentSchema, NumberInputControlSchema, RadioGroupControlSchema, RateControlSchema, SelectControlSchema, SliderControlSchema, StepsComponentSchema, TabsComponentSchema, TextareaControlSchema, TextComponentSchema, TimePickerControlSchema, ToggleControlSchema, TreeSelectControlSchema } from '../schemas';
import { SchemaType } from '../schemas/interfaces';
import { SCHEMA_MAP, WIDGET_MAP } from '../tokens';
import { isNumber } from '../utils';
import { AbstractWidget, ButtonGroupWidget, ButtonWidget, CascaderWidget, CheckboxGroupWidget, CheckboxWidget, DateRangeWidget, DateWidget, InputGroupWidget, InputWidget, NestedFormWidget, NumberWidget, RadioGroupWidget, RateWidget, SelectWidget, SilderWidget, StepsWidget, TabsWidget, TextareaWidget, TextWidget, TimeWidget, ToggleWidget, TreeSelectWidget } from '../widgets';
import { WidgetKind } from '../widgets/kind';
import { makeFluentFormFeature } from './helper';
import { FluentFormFeature, FluentFormFeatureKind } from './interface';

export interface FluentFormWidgetFeature<S extends AbstractSchema> extends SchemaConfig<S> {
  kind: string;
  widget: Type<AbstractWidget<unknown>>;
}

export function withWidgets(...features: (FluentFormWidgetFeature<SafeAny> | FluentFormWidgetFeature<SafeAny>[])[]): FluentFormFeature<FluentFormFeatureKind.Widget> {
  const flattenedFeatures = features.flat();

  return makeFluentFormFeature(FluentFormFeatureKind.Widget, [
    {
      provide: WIDGET_MAP,
      useValue: new Map(
        flattenedFeatures.map(feature => [
          feature.kind,
          feature.widget
        ])
      )
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
        map.set('row', { type: SchemaType.ComponentContainer });
        map.set('headless', { type: SchemaType.Control });
        map.set('template', { type: SchemaType.Component });

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
    useButtonGroupWidget(),
    useStepsWidget(),
    useTabsWidget(),
    useNestedFormWidget()
  );
}

export function useInputWidget(): FluentFormWidgetFeature<InputControlSchema> {
  return {
    type: SchemaType.Control,
    kind: WidgetKind.Input,
    widget: InputWidget,
    validators: schema => {
      const validators: ValidatorFn[] = [];

      if (schema.type === 'email') {
        validators.push(Validators.email);
      }

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
  };
}

export function useInputGroupWidget(): FluentFormWidgetFeature<InputGroupComponentSchema> {
  return {
    type: SchemaType.ControlWrapper,
    kind: WidgetKind.InputGroup,
    widget: InputGroupWidget
  };
}

export function useTextareaWidget(): FluentFormWidgetFeature<TextareaControlSchema> {
  return {
    type: SchemaType.Control,
    kind: WidgetKind.Textarea,
    widget: TextareaWidget,
    validators: schema => {
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
  };
}

export function useNumberWidget(): FluentFormWidgetFeature<NumberInputControlSchema> {
  return {
    type: SchemaType.Control,
    kind: WidgetKind.Number,
    widget: NumberWidget
  };
}

export function useDateWidget(): FluentFormWidgetFeature<DatePickerControlSchema> {
  return {
    type: SchemaType.Control,
    kind: WidgetKind.Date,
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
    type: SchemaType.Control,
    kind: WidgetKind.DateRange,
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
    type: SchemaType.Control,
    kind: WidgetKind.Time,
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
    type: SchemaType.Control,
    kind: WidgetKind.Toggle,
    widget: ToggleWidget
  };
}

export function useSelectWidget(): FluentFormWidgetFeature<SelectControlSchema> {
  return {
    type: SchemaType.Control,
    kind: WidgetKind.Select,
    widget: SelectWidget
  };
}

export function useCascaderWidget(): FluentFormWidgetFeature<CascaderControlSchema> {
  return {
    type: SchemaType.Control,
    kind: WidgetKind.Cascader,
    widget: CascaderWidget
  };
}

export function useTreeSelectWidget(): FluentFormWidgetFeature<TreeSelectControlSchema> {
  return {
    type: SchemaType.Control,
    kind: WidgetKind.TreeSelect,
    widget: TreeSelectWidget
  };
}

export function useSliderWidget(): FluentFormWidgetFeature<SliderControlSchema> {
  return {
    type: SchemaType.Control,
    kind: WidgetKind.Slider,
    widget: SilderWidget
  };
}

export function useRadioGroupWidget(): FluentFormWidgetFeature<RadioGroupControlSchema> {
  return {
    type: SchemaType.Control,
    kind: WidgetKind.RadioGroup,
    widget: RadioGroupWidget
  };
}

export function useCheckboxWidget(): FluentFormWidgetFeature<CheckboxControlSchema> {
  return {
    type: SchemaType.Control,
    kind: WidgetKind.Checkbox,
    widget: CheckboxWidget
  };
}

export function useCheckboxGroupWidget(): FluentFormWidgetFeature<CheckboxGroupControlSchema> {
  return {
    type: SchemaType.Control,
    kind: WidgetKind.CheckboxGroup,
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
    type: SchemaType.Control,
    kind: WidgetKind.Rate,
    widget: RateWidget
  };
}

export function useTextWidget(): FluentFormWidgetFeature<TextComponentSchema> {
  return {
    type: SchemaType.Component,
    kind: WidgetKind.Text,
    widget: TextWidget
  };
}

export function useButtonWidget(): FluentFormWidgetFeature<ButtonComponentSchema> {
  return {
    type: SchemaType.Component,
    kind: WidgetKind.Button,
    widget: ButtonWidget
  };
}

export function useButtonGroupWidget(): FluentFormWidgetFeature<ButtonGroupComponentSchema> {
  return {
    type: SchemaType.ComponentWrapper,
    kind: WidgetKind.ButtonGroup,
    widget: ButtonGroupWidget
  };
}

export function useStepsWidget(): FluentFormWidgetFeature<StepsComponentSchema> {
  return {
    type: SchemaType.ComponentContainer,
    kind: WidgetKind.Steps,
    widget: StepsWidget
  };
}

export function useTabsWidget(): FluentFormWidgetFeature<TabsComponentSchema> {
  return {
    type: SchemaType.ComponentContainer,
    kind: WidgetKind.Tabs,
    widget: TabsWidget
  };
}

export function useNestedFormWidget(): [FluentFormWidgetFeature<FormGroupSchema>, FluentFormWidgetFeature<FormArraySchema>] {
  return [
    {
      type: SchemaType.ControlContainer,
      kind: WidgetKind.Group,
      widget: NestedFormWidget
    },
    {
      type: SchemaType.ControlContainer,
      kind: WidgetKind.Array,
      widget: NestedFormWidget
    }
  ];
}
