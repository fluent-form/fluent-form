import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  AbstractWidget,
  FluentBindingDirective,
  FluentColumnPipe,
  FluentContextGuardDirective,
  FluentControlPipe,
  FluentFormFieldOutletDirective,
  FluentGridModule,
  FluentReactivePipe,
  RenderablePipe,
  WidgetTemplateContext
} from '@fluent-form/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormGroupSchema } from '../../schemas';

type FormGroupWidgetTemplateContext = WidgetTemplateContext<FormGroupSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  imports: [
    NgTemplateOutlet,
    NzFormModule,
    FluentGridModule,
    FluentFormFieldOutletDirective,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentColumnPipe,
    FluentReactivePipe,
    FluentControlPipe,
    RenderablePipe
  ],
  templateUrl: './form-group.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class FormGroupWidget extends AbstractWidget<FormGroupWidgetTemplateContext> { }
