import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractFormContentComponent,
  FluentBindingDirective,
  FluentColumnPipe,
  FluentControlPipe,
  FluentGridModule,
  FluentReactivePipe,
  FluentWidgetWrapperOutlet,
  RenderablePipe
} from '@fluent-form/core';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
  imports: [
    NgTemplateOutlet,
    NzFormModule,
    FluentGridModule,
    FluentWidgetWrapperOutlet,
    FluentBindingDirective,
    FluentReactivePipe,
    FluentControlPipe,
    FluentColumnPipe,
    RenderablePipe
  ],
  templateUrl: './form-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormContentComponent extends AbstractFormContentComponent { }
