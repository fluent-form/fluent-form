import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractWidgetWrapper,
  FluentControlPipe,
  FluentNextWidgetWrapperOutlet,
  FluentReactivePipe,
  FluentSchemaTypePipe,
  FluentTemplateOutlet,
  FluentTemplatePipe,
  InvokePipe,
  SchemaType
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
    InvokePipe
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
