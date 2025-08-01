import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray } from '@angular/forms';
import {
  AbstractSchema,
  AbstractWidget,
  FluentBindingDirective,
  FluentColumnPipe,
  FluentContextGuardDirective,
  FluentFormFieldOutletDirective,
  FluentGridModule,
  FluentReactivePipe,
  FormUtil,
  InvokePipe,
  RenderablePipe,
  SchemaUtil,
  WidgetTemplateContext
} from '@fluent-form/core';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { lengthHelper } from '../../helper';
import { TabsArraySchema } from '../../schemas';

type TabsArrayWidgetTemplateContext = WidgetTemplateContext<TabsArraySchema, FormArray>;

/**
 * @internal
 */
@Component({
  imports: [
    NgTemplateOutlet,
    NzEmptyModule,
    NzFormModule,
    NzTabsModule,
    FluentGridModule,
    FluentFormFieldOutletDirective,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentColumnPipe,
    FluentReactivePipe,
    InvokePipe,
    RenderablePipe
  ],
  templateUrl: './tabs-array.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsArrayWidget extends AbstractWidget<TabsArrayWidgetTemplateContext> {
  private readonly schemaUtil = inject(SchemaUtil);
  private readonly formUtil = inject(FormUtil);

  protected push(control: FormArray, schema: TabsArraySchema) {
    const [elementSchema] = this.schemaUtil.filterControls(schema.schemas);

    control.push(
      this.formUtil.createAnyControl(elementSchema, {})
    );
  }

  protected readonly helper = {
    length: lengthHelper
  } as const;

  withIndex(index: number, schema: AbstractSchema): AbstractSchema {
    return { ...schema, key: index };
  }
}
