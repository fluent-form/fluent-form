import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  AbstractWidget,
  FluentBindingDirective,
  FluentContextGuardDirective,
  FluentReactivePipe,
  WidgetTemplateContext
} from '@fluent-form/core';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { SegmentedControlSchema } from '../../schemas';

type SegmentedWidgetTemplateContext = WidgetTemplateContext<SegmentedControlSchema, FormControl<string | number>>;

/**
 * @internal
 */
@Component({
  imports: [
    ReactiveFormsModule,
    NzSegmentedModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe
  ],
  templateUrl: './segmented.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class SegmentedWidget extends AbstractWidget<SegmentedWidgetTemplateContext> { }
