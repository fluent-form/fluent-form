import { NgClass, NgFor, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { FluentFormColContentOutletComponent } from '../../components';
import { FluentBinderDirective, FluentConfigDirective, FluentWithContextGuardDirective } from '../../directives';
import { FluentCallPipe, FluentControlPipe, FluentTypeofPipe } from '../../pipes';
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
    FluentBinderDirective,
    FluentConfigDirective,
    FluentWithContextGuardDirective,
    FluentCallPipe,
    FluentTypeofPipe,
    FluentControlPipe
  ],
  templateUrl: './steps.widget.html',
})
export class StepsWidget extends AbstractWidget<StepsWidgetTemplateContext> {
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<StepsWidgetTemplateContext>;
}
