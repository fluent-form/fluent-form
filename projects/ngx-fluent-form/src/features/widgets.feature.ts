import { Provider, Type } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { SchemaConfig } from '../interfaces';
import { SchemaPatchFn, provideSchemaPatcher } from '../patcher';
import { AbstractSchema, AbstractTextControlSchema, AlertComponentSchema, ButtonComponentSchema, ButtonGroupComponentSchema, CascaderControlSchema, CheckboxControlSchema, CheckboxGroupControlSchema, DatePickerControlSchema, DateRangePickerControlSchema, FormArraySchema, FormGroupSchema, HeadingComponentSchema, InputControlSchema, InputGroupComponentSchema, NumberGroupComponentSchema, NumberInputControlSchema, RadioGroupControlSchema, RateControlSchema, SelectControlSchema, SliderControlSchema, StepComponentSchema, StepsComponentSchema, TabComponentSchema, TabsComponentSchema, TextComponentSchema, TextareaControlSchema, TimePickerControlSchema, ToggleControlSchema, TreeSelectControlSchema } from '../schemas';
import { SchemaKind, SchemaType } from '../schemas/interfaces';
import { SCHEMA_MAP, WIDGET_MAP } from '../tokens';
import { isNumber } from '../utils';
import { AbstractWidget, AlertWidget, ButtonGroupWidget, ButtonWidget, CascaderWidget, CheckboxGroupWidget, CheckboxWidget, DateRangeWidget, DateWidget, FormArrayWidget, FormGroupWidget, HeadingWidget, InputGroupWidget, InputWidget, NumberGroupWidget, NumberWidget, RadioGroupWidget, RateWidget, RowWidget, SelectWidget, SilderWidget, SpaceWidget, StepsWidget, TabsWidget, TextWidget, TextareaWidget, TimeWidget, ToggleWidget, TreeSelectWidget } from '../widgets';
import { makeFluentFeature } from './helper';
import { FluentFormFeature, FluentFormFeatureKind } from './interface';

export interface FluentFormWidgetFeature<S extends AbstractSchema> extends SchemaConfig<S> {
  kind: string;
  widget?: Type<AbstractWidget<unknown>>;
  /** 修补图示，标准化图示时调用 */
  patch?: SchemaPatchFn<S>;
}

export function withWidgets(features: (FluentFormWidgetFeature<SafeAny> | FluentFormWidgetFeature<SafeAny>[])[]): FluentFormFeature<FluentFormFeatureKind.Widget> {
  const flattenedFeatures = features.flat().concat(
    useRowWidget() // 添加内置 widget
  );

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
        map.set(SchemaKind.Headless, { type: SchemaType.Control });
        map.set(SchemaKind.Template, { type: SchemaType.Component });

        return map;
      }
    },
    // 组件内置的 patcher
    flattenedFeatures.filter(feature => feature.patch).map<Provider>(feature =>
      provideSchemaPatcher({
        selector: feature.kind,
        patch: feature.patch!
      })
    )
  ]);
}

export function withAllWidgets(): FluentFormFeature<FluentFormFeatureKind.Widget> {
  return withWidgets([
    useInputWidget(),
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
    useTextWidget(),
    useButtonWidget(),
    useAlertWidget(),
    useStepsWidget(),
    useTabsWidget(),
    useSpaceWidget(),
    useFormGroupWidget(),
    useFormArrayWidget(),
  ]);
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
        formatter: value => {
          if (!value) return null;
          return schema.time ? value.getTime() : new Date(value).setHours(0, 0, 0, 0);
        }
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
        formatter: value => {
          if (!value) return null;
          return value.map(date => schema.time ? date.getTime() : new Date(date).setHours(0, 0, 0, 0));
        }
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

export function useHeadingWidget(): FluentFormWidgetFeature<HeadingComponentSchema> {
  return {
    kind: SchemaKind.Heading,
    type: SchemaType.Component,
    widget: HeadingWidget,
    patch: schema => {
      schema.col ??= 12;
      return schema;
    },
  };
}

export function useInputGroupWidget(): FluentFormWidgetFeature<InputGroupComponentSchema> {
  return {
    kind: SchemaKind.InputGroup,
    type: SchemaType.ControlWrapper,
    widget: InputGroupWidget
  };
}

export function useNumberGroupWidget(): FluentFormWidgetFeature<NumberGroupComponentSchema> {
  return {
    kind: SchemaKind.NumberGroup,
    type: SchemaType.ControlWrapper,
    widget: NumberGroupWidget
  };
}

export function useAlertWidget(): FluentFormWidgetFeature<AlertComponentSchema> {
  return {
    kind: SchemaKind.Alert,
    type: SchemaType.Component,
    widget: AlertWidget,
    patch: schema => {
      schema.col ??= 12;
      return schema;
    },
  };
}

export function useButtonWidget(): [FluentFormWidgetFeature<ButtonComponentSchema>, FluentFormWidgetFeature<ButtonGroupComponentSchema>] {
  return [
    {
      kind: SchemaKind.Button,
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

export function useSpaceWidget(): FluentFormWidgetFeature<TextComponentSchema> {
  return {
    kind: SchemaKind.Space,
    type: SchemaType.ComponentContainer,
    widget: SpaceWidget
  };
}

/**
 * @internal
 */
function useRowWidget(): FluentFormWidgetFeature<TextComponentSchema> {
  return {
    kind: SchemaKind.Row,
    type: SchemaType.ComponentContainer,
    widget: RowWidget
  };
}

export function useFormGroupWidget(): FluentFormWidgetFeature<FormGroupSchema> {
  return {
    kind: SchemaKind.Group,
    type: SchemaType.ControlContainer,
    widget: FormGroupWidget,
    patch: schema => {
      schema.layout ??= 'vertical';
      schema.gap ??= { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 };
      return schema;
    }
  };
}

export function useFormArrayWidget(): FluentFormWidgetFeature<FormArraySchema> {
  return {
    kind: SchemaKind.Array,
    type: SchemaType.ControlContainer,
    widget: FormArrayWidget
  };
}
