import { NgClass, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AbstractSchema, FluentControlPipe, FluentReactivePipe, FluentSchemaPipe, FluentSchemaTypePipe, FluentTemplatePipe, FluentVarDirective, FluentWidgetTemplatePipe, FluentWithInjectorDirective, Indexable, InvokePipe, SchemaType } from '@fluent-form/core';
import { AnyArray, AnyObject } from '@ngify/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { labelHelper, tooltipHelper } from '../../helper';

/**
 * @internal
 */
@Component({
  selector: 'fluent-col[schema],[fluentFormItemContent]',
  standalone: true,
  imports: [
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgClass,
    NgTemplateOutlet,
    NzFormModule,
    FluentWithInjectorDirective,
    FluentVarDirective,
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
export class FluentFormItemContentComponent<T extends AnyObject | AnyArray> {
  protected readonly SchemaType = SchemaType;

  @Input() control!: AbstractControl;
  @Input() schema!: Indexable<AbstractSchema>;
  @Input() model!: T;

  protected readonly helper = {
    label: labelHelper,
    tooltip: tooltipHelper
  };

}
