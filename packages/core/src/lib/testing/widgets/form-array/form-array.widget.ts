import { type CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray } from '@angular/forms';
import type { FormArraySchema } from '../../schemas';
import {
  type AbstractSchema,
  AbstractWidget,
  FluentBindingDirective,
  FluentColumnPipe,
  FluentContextGuardDirective,
  FluentFormItemOutletDirective,
  FluentGridModule,
  FluentReactivePipe,
  FormUtil,
  InvokePipe,
  RenderablePipe,
  SchemaUtil,
  type WidgetTemplateContext,
  isNumber
} from '@fluent-form/core';

type FormArrayWidgetTemplateContext = WidgetTemplateContext<FormArraySchema, FormArray>;

/**
 * @internal
 */
@Component({
  imports: [
    NgTemplateOutlet,
    DragDropModule,
    FluentGridModule,
    FluentFormItemOutletDirective,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentColumnPipe,
    FluentReactivePipe,
    InvokePipe,
    RenderablePipe
  ],
  templateUrl: './form-array.widget.html',
  styleUrls: ['./form-array.widget.scss']
})
export class FormArrayWidget extends AbstractWidget<FormArrayWidgetTemplateContext> {
  private readonly schemaUtil = inject(SchemaUtil);
  private readonly formUtil = inject(FormUtil);

  protected push(control: FormArray, schema: FormArraySchema) {
    const [elementSchema] = this.schemaUtil.filterControls(schema.schemas);

    control.push(
      this.formUtil.createAnyControl(elementSchema, {})
    );
  }

  protected drop(control: FormArray, event: CdkDragDrop<unknown>) {
    moveItemInArray(control.controls, event.previousIndex, event.currentIndex);
    control.updateValueAndValidity();
  }

  protected readonly helper = {
    length: {
      min: (length: FormArraySchema['length']) => {
        return isNumber(length) ? length : length?.min ?? 0;
      },
      max: (length: FormArraySchema['length']) => {
        return isNumber(length) ? length : length?.max ?? Infinity;
      }
    }
  } as const;

  withIndex(index: number, schema: AbstractSchema): AbstractSchema {
    return { ...schema, key: index };
  }
}
