import { Type } from '@angular/core';
import { WIDGET_MAP } from '../tokens';
import { AbstractWidget, ButtonGroupWidget, ButtonWidget, CascaderWidget, CheckboxGroupWidget, CheckboxWidget, DateRangeWidget, DateWidget, InputGroupWidget, InputWidget, NestedFormWidget, NumberWidget, RadioGroupWidget, RateWidget, SelectWidget, SilderWidget, StepsWidget, TabsWidget, TextareaWidget, TextWidget, TimeWidget, ToggleWidget, TreeSelectWidget } from '../widgets';
import { WidgetKind } from '../widgets/kind';
import { makeFluentFormFeature } from './helper';
import { FluentFormFeature, FluentFormFeatureKind } from './interface';

export interface FluentFormWidgetFeature {
  kind: WidgetKind;
  widget: Type<AbstractWidget<unknown>>;
}

export function withWidgets(...features: (FluentFormWidgetFeature | FluentFormWidgetFeature[])[]): FluentFormFeature<FluentFormFeatureKind.Widget> {
  return makeFluentFormFeature(FluentFormFeatureKind.Widget, [
    {
      provide: WIDGET_MAP,
      useValue: new Map(
        features.flat().map(feature => [
          feature.kind,
          feature.widget
        ])
      )
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

function makeFluentFormWidgetFeature(kind: WidgetKind, widget: Type<AbstractWidget<unknown>>): FluentFormWidgetFeature {
  return { kind, widget };
}

export function useInputWidget(): FluentFormWidgetFeature {
  return makeFluentFormWidgetFeature(WidgetKind.Input, InputWidget);
}

export function useInputGroupWidget(): FluentFormWidgetFeature {
  return makeFluentFormWidgetFeature(WidgetKind.InputGroup, InputGroupWidget);
}

export function useTextareaWidget(): FluentFormWidgetFeature {
  return makeFluentFormWidgetFeature(WidgetKind.Textarea, TextareaWidget);
}

export function useNumberWidget(): FluentFormWidgetFeature {
  return makeFluentFormWidgetFeature(WidgetKind.Number, NumberWidget);
}

export function useDateWidget(): FluentFormWidgetFeature {
  return makeFluentFormWidgetFeature(WidgetKind.Date, DateWidget);
}

export function useDateRangeWidget(): FluentFormWidgetFeature {
  return makeFluentFormWidgetFeature(WidgetKind.DateRange, DateRangeWidget);
}

export function useTimeWidget(): FluentFormWidgetFeature {
  return makeFluentFormWidgetFeature(WidgetKind.Time, TimeWidget);
}

export function useToggleWidget(): FluentFormWidgetFeature {
  return makeFluentFormWidgetFeature(WidgetKind.Toggle, ToggleWidget);
}

export function useSelectWidget(): FluentFormWidgetFeature {
  return makeFluentFormWidgetFeature(WidgetKind.Select, SelectWidget);
}

export function useCascaderWidget(): FluentFormWidgetFeature {
  return makeFluentFormWidgetFeature(WidgetKind.Cascader, CascaderWidget);
}

export function useTreeSelectWidget(): FluentFormWidgetFeature {
  return makeFluentFormWidgetFeature(WidgetKind.TreeSelect, TreeSelectWidget);
}

export function useSliderWidget(): FluentFormWidgetFeature {
  return makeFluentFormWidgetFeature(WidgetKind.Slider, SilderWidget);
}

export function useRadioGroupWidget(): FluentFormWidgetFeature {
  return makeFluentFormWidgetFeature(WidgetKind.RadioGroup, RadioGroupWidget);
}

export function useCheckboxWidget(): FluentFormWidgetFeature {
  return makeFluentFormWidgetFeature(WidgetKind.Checkbox, CheckboxWidget);
}

export function useCheckboxGroupWidget(): FluentFormWidgetFeature {
  return makeFluentFormWidgetFeature(WidgetKind.CheckboxGroup, CheckboxGroupWidget);
}

export function useRateWidget(): FluentFormWidgetFeature {
  return makeFluentFormWidgetFeature(WidgetKind.Rate, RateWidget);
}

export function useTextWidget(): FluentFormWidgetFeature {
  return makeFluentFormWidgetFeature(WidgetKind.Text, TextWidget);
}

export function useButtonWidget(): FluentFormWidgetFeature {
  return makeFluentFormWidgetFeature(WidgetKind.Button, ButtonWidget);
}

export function useButtonGroupWidget(): FluentFormWidgetFeature {
  return makeFluentFormWidgetFeature(WidgetKind.ButtonGroup, ButtonGroupWidget);
}

export function useStepsWidget(): FluentFormWidgetFeature {
  return makeFluentFormWidgetFeature(WidgetKind.Steps, StepsWidget);
}

export function useTabsWidget(): FluentFormWidgetFeature {
  return makeFluentFormWidgetFeature(WidgetKind.Tabs, TabsWidget);
}

export function useNestedFormWidget(): FluentFormWidgetFeature[] {
  return [
    makeFluentFormWidgetFeature(WidgetKind.Group, NestedFormWidget),
    makeFluentFormWidgetFeature(WidgetKind.Array, NestedFormWidget)
  ];
}
