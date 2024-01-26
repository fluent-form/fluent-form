import { NgClass, NgFor, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { FluentFormItemOutletComponent, FluentGridModule } from '../../components';
import { FluentBindingDirective, FluentContextGuardDirective, FluentParentRowDirective } from '../../directives';
import { FluentColumnPipe, FluentControlPipe, FluentReactivePipe, FluentTemplatePipe } from '../../pipes';
import { StepsComponentSchema } from '../../schemas';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

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
    FluentFormItemOutletComponent,
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
