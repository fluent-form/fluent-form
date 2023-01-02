import { NgModule, Type } from '@angular/core';
import { FluentFormComponent } from './components';
import { FluentFormDirective, FluentFormNameDirective, FluentOutletDirective } from './directives';
import { WidgetKind } from './enumerations';
import { WIDGET_MAP } from './tokens';
import { AbstractWidget, ButtonGroupWidget, ButtonWidget, CascaderWidget, CheckboxGroupWidget, CheckboxWidget, DateRangeWidget, DateWidget, InputGroupWidget, InputWidget, NumberWidget, RadioGroupWidget, RateWidget, SelectWidget, SilderWidget, TextareaWidget, TextWidget, TimeWidget, ToggleWidget, TreeSelectWidget } from './widgets';

@NgModule({
  imports: [
    FluentFormComponent,
    FluentFormDirective,
    FluentFormNameDirective,
    FluentOutletDirective,
  ],
  exports: [
    FluentFormComponent,
    FluentFormDirective,
    FluentFormNameDirective,
    FluentOutletDirective,
  ],
  providers: [
    {
      provide: WIDGET_MAP,
      useValue: new Map<WidgetKind, Type<AbstractWidget<unknown>>>([
        [WidgetKind.Input, InputWidget],
        [WidgetKind.InputGroup, InputGroupWidget],
        [WidgetKind.Textarea, TextareaWidget],
        [WidgetKind.Number, NumberWidget],
        [WidgetKind.Date, DateWidget],
        [WidgetKind.DateRange, DateRangeWidget],
        [WidgetKind.Time, TimeWidget],
        [WidgetKind.Toggle, ToggleWidget],
        [WidgetKind.Select, SelectWidget],
        [WidgetKind.Cascader, CascaderWidget],
        [WidgetKind.TreeSelect, TreeSelectWidget],
        [WidgetKind.Slider, SilderWidget],
        [WidgetKind.RadioGroup, RadioGroupWidget],
        [WidgetKind.Checkbox, CheckboxWidget],
        [WidgetKind.CheckboxGroup, CheckboxGroupWidget],
        [WidgetKind.Rate, RateWidget],
        [WidgetKind.Text, TextWidget],
        [WidgetKind.Button, ButtonWidget],
        [WidgetKind.ButtonGroup, ButtonGroupWidget],
      ])
    }
  ]
})
export class FluentFormModule { }
