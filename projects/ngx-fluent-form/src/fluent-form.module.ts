import { NgModule, Type } from '@angular/core';
import { FluentFormComponent } from './components';
import { FluentFormDirective, FluentFormNameDirective, FluentOutletDirective } from './directives';
import { WidgetKind } from './enumerations';
import { WIDGET_MAP } from './tokens';
import { AbstractWidget } from './widgets/abstract.widget';
import { ButtonGroupWidget } from './widgets/button-group/button-group.widget';
import { ButtonWidget } from './widgets/button/button.widget';
import { CascaderWidget } from './widgets/cascader/cascader.widget';
import { CheckboxGroupWidget } from './widgets/checkbox-group/checkbox-group.widget';
import { CheckboxWidget } from './widgets/checkbox/checkbox.widget';
import { DateRangeWidget } from './widgets/date-range/date-range.widget';
import { DateWidget } from './widgets/date/date.widget';
import { InputGroupWidget } from './widgets/input-group/input-group.widget';
import { InputWidget } from './widgets/input/input.widget';
import { NumberWidget } from './widgets/number/number.widget';
import { RadioGroupWidget } from './widgets/radio-group/radio-group.widget';
import { RateWidget } from './widgets/rate/rate.widget';
import { SelectWidget } from './widgets/select/select.widget';
import { SilderWidget } from './widgets/slider/silder.widget';
import { TextWidget } from './widgets/text/text.widget';
import { TextareaWidget } from './widgets/textarea/textarea.widget';
import { TimeWidget } from './widgets/time/time.widget';
import { ToggleWidget } from './widgets/toggle/toggle.widget';
import { TreeSelectWidget } from './widgets/tree-select/tree-select.widget';

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
