import { Type } from '@angular/core';
import { WidgetKind } from './enumerations';
import { AbstractWidget, ButtonGroupWidget, ButtonWidget, CascaderWidget, CheckboxGroupWidget, CheckboxWidget, DateRangeWidget, DateWidget, InputGroupWidget, InputWidget, NumberWidget, RadioGroupWidget, RateWidget, SelectWidget, SilderWidget, TextareaWidget, TextWidget, TimeWidget, ToggleWidget, TreeSelectWidget } from './widgets';

export interface FluentFormFeature {
  kind: WidgetKind;
  widget: Type<AbstractWidget<unknown>>;
}

export function withAllWidgets(): FluentFormFeature[] {
  return [
    withInputWidget(),
    withInputGroupWidget(),
    withTextareaWidget(),
    withNumberWidget(),
    withDateWidget(),
    withDateRangeWidget(),
    withTimeWidget(),
    withToggleWidget(),
    withSelectWidget(),
    withCascaderWidget(),
    withTreeSelectWidget(),
    withSliderWidget(),
    withRadioGroupWidget(),
    withCheckboxWidget(),
    withCheckboxGroupWidget(),
    withRateWidget(),
    withTextWidget(),
    withButtonWidget(),
    withButtonGroupWidget()
  ];
}

export function withInputWidget(): FluentFormFeature {
  return {
    kind: WidgetKind.Input,
    widget: InputWidget
  };
}

export function withInputGroupWidget(): FluentFormFeature {
  return {
    kind: WidgetKind.InputGroup,
    widget: InputGroupWidget
  };
}

export function withTextareaWidget(): FluentFormFeature {
  return {
    kind: WidgetKind.Textarea,
    widget: TextareaWidget
  };
}

export function withNumberWidget(): FluentFormFeature {
  return {
    kind: WidgetKind.Number,
    widget: NumberWidget
  };
}

export function withDateWidget(): FluentFormFeature {
  return {
    kind: WidgetKind.Date,
    widget: DateWidget
  };
}

export function withDateRangeWidget(): FluentFormFeature {
  return {
    kind: WidgetKind.DateRange,
    widget: DateRangeWidget
  };
}

export function withTimeWidget(): FluentFormFeature {
  return {
    kind: WidgetKind.Time,
    widget: TimeWidget
  };
}

export function withToggleWidget(): FluentFormFeature {
  return {
    kind: WidgetKind.Toggle,
    widget: ToggleWidget
  };
}

export function withSelectWidget(): FluentFormFeature {
  return {
    kind: WidgetKind.Select,
    widget: SelectWidget
  };
}

export function withCascaderWidget(): FluentFormFeature {
  return {
    kind: WidgetKind.Cascader,
    widget: CascaderWidget
  };
}

export function withTreeSelectWidget(): FluentFormFeature {
  return {
    kind: WidgetKind.TreeSelect,
    widget: TreeSelectWidget
  };
}

export function withSliderWidget(): FluentFormFeature {
  return {
    kind: WidgetKind.Slider,
    widget: SilderWidget
  };
}

export function withRadioGroupWidget(): FluentFormFeature {
  return {
    kind: WidgetKind.RadioGroup,
    widget: RadioGroupWidget
  };
}

export function withCheckboxWidget(): FluentFormFeature {
  return {
    kind: WidgetKind.Checkbox,
    widget: CheckboxWidget
  };
}

export function withCheckboxGroupWidget(): FluentFormFeature {
  return {
    kind: WidgetKind.CheckboxGroup,
    widget: CheckboxGroupWidget
  };
}

export function withRateWidget(): FluentFormFeature {
  return {
    kind: WidgetKind.Rate,
    widget: RateWidget
  };
}

export function withTextWidget(): FluentFormFeature {
  return {
    kind: WidgetKind.Text,
    widget: TextWidget
  };
}

export function withButtonWidget(): FluentFormFeature {
  return {
    kind: WidgetKind.Button,
    widget: ButtonWidget
  };
}

export function withButtonGroupWidget(): FluentFormFeature {
  return {
    kind: WidgetKind.ButtonGroup,
    widget: ButtonGroupWidget
  };
}
