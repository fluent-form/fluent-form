import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractWidgetWrapper,
  ClassPipe,
  FluentControlPipe,
  FluentNextWidgetWrapperOutlet,
  FluentReactivePipe,
  FluentSchemaTypePipe,
  FluentTemplateOutlet,
  FluentTemplatePipe,
  InvokePipe,
  SchemaType,
  StylePipe
} from '@fluent-form/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { labelHelper, tooltipHelper } from '../../helper';

@Component({
  imports: [
    NzFormModule,
    FluentReactivePipe,
    FluentControlPipe,
    FluentTemplatePipe,
    FluentSchemaTypePipe,
    FluentTemplateOutlet,
    FluentNextWidgetWrapperOutlet,
    InvokePipe,
    ClassPipe,
    StylePipe
  ],
  templateUrl: './form-field-wrapper.component.html',
  styleUrl: './form-field-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldWrapper extends AbstractWidgetWrapper {
  protected readonly SchemaType = SchemaType;

  protected readonly helper = {
    label: labelHelper,
    tooltip: tooltipHelper
  };
}
