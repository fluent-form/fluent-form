import { NgClass, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AnyArray, AnyObject } from '@ngify/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FluentVarDirective, FluentWithInjectorDirective } from '../../directives';
import { FluentControlPipe, FluentReactivePipe, FluentSchemaPipe, FluentSchemaTypePipe, FluentTemplatePipe, FluentWidgetTemplatePipe, InvokePipe } from '../../pipes';
import { AbstractSchema } from '../../schemas';
import { labelHelper, tooltipHelper } from '../../schemas/helper';
import { SchemaType } from '../../schemas/interfaces';
import { Indexable } from '../../types';

/**
 * @internal
 */
@Component({
  selector: 'fluent-col[schema],[fluentFormItemOutlet]',
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
  templateUrl: './form-item-outlet.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FluentFormItemOutletComponent<T extends AnyObject | AnyArray> {
  protected readonly SchemaType = SchemaType;

  @Input() control!: AbstractControl;
  @Input() schema!: Indexable<AbstractSchema>;
  @Input() model!: T;

  protected readonly helper = {
    label: labelHelper,
    tooltip: tooltipHelper
  };

}
