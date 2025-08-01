import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractFormFieldContentComponent,
  FluentControlPipe,
  FluentReactivePipe,
  FluentSchemaTypePipe,
  FluentTemplateOutlet,
  FluentTemplatePipe,
  FluentWidgetTemplatePipe,
  FluentWithInjectorDirective,
  InvokePipe,
  SchemaType
} from '@fluent-form/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { labelHelper, tooltipHelper } from '../../helper';

/**
 * @internal
 */
@Component({
  imports: [
    NgTemplateOutlet,
    NzFormModule,
    FluentWithInjectorDirective,
    FluentReactivePipe,
    FluentControlPipe,
    FluentTemplatePipe,
    FluentWidgetTemplatePipe,
    FluentSchemaTypePipe,
    FluentTemplateOutlet,
    InvokePipe
  ],
  templateUrl: './form-field-content.component.html',
  styleUrl: './form-field-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldContentComponent extends AbstractFormFieldContentComponent {
  protected readonly SchemaType = SchemaType;

  protected readonly helper = {
    label: labelHelper,
    tooltip: tooltipHelper
  };
}
