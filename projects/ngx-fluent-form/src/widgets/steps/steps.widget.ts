import { NgClass, NgFor, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { FluentFormColContentOutletComponent } from '../../components';
import { FluentBindingDirective, FluentConfigDirective, FluentContextGuardDirective } from '../../directives';
import { FluentColumnPipe, FluentControlPipe, FluentReactivePipe } from '../../pipes';
import { StepsComponentSchema } from '../../schemas';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type StepsWidgetTemplateContext = WidgetTemplateContext<StepsComponentSchema, FormGroup>;

@Component({
  standalone: true,
  imports: [
    NgFor,
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    NzStepsModule,
    NzGridModule,
    FluentFormColContentOutletComponent,
    FluentBindingDirective,
    FluentConfigDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentControlPipe,
    FluentColumnPipe
  ],
  templateUrl: './steps.widget.html',
})
export class StepsWidget extends AbstractWidget<StepsWidgetTemplateContext> { }
