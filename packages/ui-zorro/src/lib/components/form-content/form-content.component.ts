import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractFormContentComponent,
  ClassPipe,
  FluentBindingDirective,
  FluentColumnPipe,
  FluentControlPipe,
  FluentGridModule,
  FluentReactivePipe,
  FluentWidgetWrapperOutlet,
  RenderablePipe,
  StylePipe
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
    RenderablePipe,
    ClassPipe,
    StylePipe
  ],
  templateUrl: './form-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormContentComponent extends AbstractFormContentComponent { }
