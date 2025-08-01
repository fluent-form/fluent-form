import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractFormContentComponent,
  FluentBindingDirective,
  FluentColumnPipe,
  FluentControlPipe,
  FluentFormFieldOutletDirective,
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
    FluentFormFieldOutletDirective,
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
