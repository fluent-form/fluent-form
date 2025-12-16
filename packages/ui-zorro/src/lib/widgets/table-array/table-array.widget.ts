import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Directive, ElementRef, inject } from '@angular/core';
import { FormArray } from '@angular/forms';
import {
  AbstractFormArraySchema,
  AbstractSchema,
  AbstractWidget,
  FluentBindingDirective,
  FluentContextGuardDirective,
  FluentControlPipe,
  FluentGridModule,
  FluentReactivePipe,
  FluentWidgetTemplatePipe,
  FormUtil,
  InvokePipe,
  isBoolean,
  isUndefined,
  RenderablePipe,
  SchemaUtil,
  WidgetTemplateContext,
  WithoutSchemaReactiveFn
} from '@fluent-form/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { lengthHelper, tooltipHelper } from '../../helper';
import { AddableButton, TableArraySchema } from '../../schemas';

type TableArrayWidgetTemplateContext = WidgetTemplateContext<TableArraySchema, FormArray>;

@Directive({
  selector: '[element]',
  exportAs: 'element'
})
export class ElementDirective {
  readonly ref = inject(ElementRef);
}

/**
 * @internal
 */
@Component({
  imports: [
    AsyncPipe,
    NgTemplateOutlet,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    NzToolTipModule,
    CdkDrag,
    CdkDropList,
    FluentGridModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentControlPipe,
    RenderablePipe,
    InvokePipe,
    FluentWidgetTemplatePipe,
    ElementDirective
  ],
  templateUrl: './table-array.widget.html',
  styleUrl: './table-array.widget.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TableArrayWidget extends AbstractWidget<TableArrayWidgetTemplateContext> {
  private readonly schemaUtil = inject(SchemaUtil);
  private readonly formUtil = inject(FormUtil);

  protected readonly helper = {
    length: lengthHelper,
    addable: (addable: WithoutSchemaReactiveFn<TableArraySchema['addable']>): AddableButton => {
      if (isUndefined(addable) || isBoolean(addable)) {
        return {
          type: 'dashed',
          icon: 'plus',
          disabled: isBoolean(addable) ? !addable : false
        };
      }

      return addable;
    },
    tooltip: tooltipHelper
  } as const;

  protected push(control: FormArray, schema: AbstractFormArraySchema) {
    const [elementSchema] = this.schemaUtil.filterControls(schema.schemas);

    control.push(
      this.formUtil.createAnyControl(elementSchema, {})
    );
  }

  protected drop(control: FormArray, event: CdkDragDrop<unknown>) {
    moveItemInArray(control.controls, event.previousIndex, event.currentIndex);
    control.updateValueAndValidity();
  }

  protected withIndex(index: number, schema: AbstractSchema): AbstractSchema {
    return { ...schema, key: index };
  }
}
