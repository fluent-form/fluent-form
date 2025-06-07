import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractFormContentComponent,
  FluentBindingDirective,
  FluentColumnPipe,
  FluentControlPipe,
  FluentFormItemOutletDirective,
  FluentGridModule,
  FluentReactivePipe,
  RenderablePipe
} from '@fluent-form/core';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
  imports: [
    NgTemplateOutlet,
    NzFormModule,
    FluentGridModule,
    FluentFormItemOutletDirective,
    FluentBindingDirective,
    FluentReactivePipe,
    FluentControlPipe,
    FluentColumnPipe,
    RenderablePipe
  ],
  templateUrl: './form-content.component.html'
})
export class FormContentComponent extends AbstractFormContentComponent { }
