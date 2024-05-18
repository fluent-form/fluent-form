import { NgClass, NgFor, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentColumnPipe, FluentContextGuardDirective, FluentControlPipe, FluentGridModule, FluentParentRowDirective, FluentReactivePipe, FluentTemplatePipe, WidgetTemplateContext } from '@fluent-form/core';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { FluentFormItemContentComponent } from '../../components';
import { StepsComponentSchema } from '../../schemas';

type StepsWidgetTemplateContext = WidgetTemplateContext<StepsComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgFor,
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    NzStepsModule,
    FluentGridModule,
    FluentFormItemContentComponent,
    FluentBindingDirective,
    FluentParentRowDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentControlPipe,
    FluentColumnPipe,
    FluentTemplatePipe
  ],
  templateUrl: './steps.widget.html',
})
export class StepsWidget extends AbstractWidget<StepsWidgetTemplateContext> { }
