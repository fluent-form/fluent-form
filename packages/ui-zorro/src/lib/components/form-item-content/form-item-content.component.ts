import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractFormItemContentComponent,
  FluentControlPipe,
  FluentReactivePipe,
  FluentSchemaPipe,
  FluentSchemaTypePipe,
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
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NzFormModule,
    FluentWithInjectorDirective,
    FluentReactivePipe,
    FluentSchemaPipe,
    FluentControlPipe,
    FluentTemplatePipe,
    FluentWidgetTemplatePipe,
    FluentSchemaTypePipe,
    InvokePipe
  ],
  templateUrl: './form-item-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormItemContentComponent extends AbstractFormItemContentComponent {
  protected readonly SchemaType = SchemaType;

  protected readonly helper = {
    label: labelHelper,
    tooltip: tooltipHelper
  };
}
