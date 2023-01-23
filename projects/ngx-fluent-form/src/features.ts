import { Provider, Type } from '@angular/core';
import { WidgetKind } from './enumerations';
import { WIDGET_MAP } from './tokens';
import { AbstractWidget, ButtonGroupWidget, ButtonWidget, CascaderWidget, CheckboxGroupWidget, CheckboxWidget, DateRangeWidget, DateWidget, InputGroupWidget, InputWidget, NumberWidget, RadioGroupWidget, RateWidget, SelectWidget, SilderWidget, TextareaWidget, TextWidget, TimeWidget, ToggleWidget, TreeSelectWidget } from './widgets';

export const enum FluentFormFeatureKind {
  Widget
}

export interface FluentFormFeature {
  kind: FluentFormFeatureKind;
  providers: Provider[];
}

export interface FluentFormWidgetFeature {
  kind: WidgetKind;
  widget: Type<AbstractWidget<unknown>>;
}

export function withAllWidgets(): FluentFormFeature {
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
    useButtonGroupWidget()
  );
}

export function withWidgets(...widgetFeatures: FluentFormWidgetFeature[]): FluentFormFeature {
  return {
    kind: FluentFormFeatureKind.Widget,
    providers: [
      {
        provide: WIDGET_MAP,
        useValue: new Map(
          widgetFeatures.map(feature => [
            feature.kind,
            feature.widget
          ])
        )
      }
    ]
  };
}

export function useInputWidget(): FluentFormWidgetFeature {
  return {
    kind: WidgetKind.Input,
    widget: InputWidget
  };
}

export function useInputGroupWidget(): FluentFormWidgetFeature {
  return {
    kind: WidgetKind.InputGroup,
    widget: InputGroupWidget
  };
}

export function useTextareaWidget(): FluentFormWidgetFeature {
  return {
    kind: WidgetKind.Textarea,
    widget: TextareaWidget
  };
}

export function useNumberWidget(): FluentFormWidgetFeature {
  return {
    kind: WidgetKind.Number,
    widget: NumberWidget
  };
}

export function useDateWidget(): FluentFormWidgetFeature {
  return {
    kind: WidgetKind.Date,
    widget: DateWidget
  };
}

export function useDateRangeWidget(): FluentFormWidgetFeature {
  return {
    kind: WidgetKind.DateRange,
    widget: DateRangeWidget
  };
}

export function useTimeWidget(): FluentFormWidgetFeature {
  return {
    kind: WidgetKind.Time,
    widget: TimeWidget
  };
}

export function useToggleWidget(): FluentFormWidgetFeature {
  return {
    kind: WidgetKind.Toggle,
    widget: ToggleWidget
  };
}

export function useSelectWidget(): FluentFormWidgetFeature {
  return {
    kind: WidgetKind.Select,
    widget: SelectWidget
  };
}

export function useCascaderWidget(): FluentFormWidgetFeature {
  return {
    kind: WidgetKind.Cascader,
    widget: CascaderWidget
  };
}

export function useTreeSelectWidget(): FluentFormWidgetFeature {
  return {
    kind: WidgetKind.TreeSelect,
    widget: TreeSelectWidget
  };
}

export function useSliderWidget(): FluentFormWidgetFeature {
  return {
    kind: WidgetKind.Slider,
    widget: SilderWidget
  };
}

export function useRadioGroupWidget(): FluentFormWidgetFeature {
  return {
    kind: WidgetKind.RadioGroup,
    widget: RadioGroupWidget
  };
}

export function useCheckboxWidget(): FluentFormWidgetFeature {
  return {
    kind: WidgetKind.Checkbox,
    widget: CheckboxWidget
  };
}

export function useCheckboxGroupWidget(): FluentFormWidgetFeature {
  return {
    kind: WidgetKind.CheckboxGroup,
    widget: CheckboxGroupWidget
  };
}

export function useRateWidget(): FluentFormWidgetFeature {
  return {
    kind: WidgetKind.Rate,
    widget: RateWidget
  };
}

export function useTextWidget(): FluentFormWidgetFeature {
  return {
    kind: WidgetKind.Text,
    widget: TextWidget
  };
}

export function useButtonWidget(): FluentFormWidgetFeature {
  return {
    kind: WidgetKind.Button,
    widget: ButtonWidget
  };
}

export function useButtonGroupWidget(): FluentFormWidgetFeature {
  return {
    kind: WidgetKind.ButtonGroup,
    widget: ButtonGroupWidget
  };
}
