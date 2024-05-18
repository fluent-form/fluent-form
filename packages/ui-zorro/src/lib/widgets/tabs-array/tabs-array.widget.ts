import { NgClass, NgFor, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray } from '@angular/forms';
import { AbstractSchema, AbstractWidget, FluentBindingDirective, FluentColumnPipe, FluentContextGuardDirective, FluentGridModule, FluentParentRowDirective, FluentReactivePipe, FluentTemplatePipe, FluentVarDirective, FormUtil, InvokePipe, RenderablePipe, SchemaUtil, WidgetTemplateContext, isNumber } from '@fluent-form/core';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { FluentFormItemContentComponent } from '../../components';
import { TabsArraySchema } from '../../schemas';

type TabsArrayWidgetTemplateContext = WidgetTemplateContext<TabsArraySchema, FormArray>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    NzEmptyModule,
    NzFormModule,
    NzTabsModule,
    NzOutletModule,
    FluentGridModule,
    FluentFormItemContentComponent,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentParentRowDirective,
    FluentColumnPipe,
    FluentReactivePipe,
    FluentTemplatePipe,
    FluentVarDirective,
    InvokePipe,
    RenderablePipe
  ],
  templateUrl: './tabs-array.widget.html'
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
    length: {
      min: (length: TabsArraySchema['length']) => {
        return isNumber(length) ? length : length?.min ?? 0;
      },
      max: (length: TabsArraySchema['length']) => {
        return isNumber(length) ? length : length?.max ?? Infinity;
      },
    }
  } as const;

  withIndex(index: number, schema: AbstractSchema): AbstractSchema {
    return { ...schema, key: index };
  }
}
