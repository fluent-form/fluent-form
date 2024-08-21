import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractFormItemContentComponent, FluentControlPipe, FluentInjectDirective, FluentReactivePipe, FluentSchemaPipe, FluentSchemaTypePipe, FluentTemplatePipe, FluentVarDirective, FluentWidgetTemplatePipe, FluentWithInjectorDirective, InvokePipe, SchemaType } from '@fluent-form/core';
import { NzFormDirective, NzFormModule } from 'ng-zorro-antd/form';
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
    FluentVarDirective,
    FluentInjectDirective,
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
  protected readonly NzFormDirective = NzFormDirective;
  protected readonly SchemaType = SchemaType;

  protected readonly helper = {
    label: labelHelper,
    tooltip: tooltipHelper
  };

}
