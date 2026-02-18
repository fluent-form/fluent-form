import { CdkDrag, type CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray } from '@angular/forms';
import type { FormArraySchema } from '../../schemas';
import {
  type AbstractSchema,
  AbstractWidget,
  ClassPipe,
  FluentBindingDirective,
  FluentColumnPipe,
  FluentContextGuardDirective,
  FluentGridModule,
  FluentReactivePipe,
  FluentWidgetWrapperOutlet,
  FormUtil,
  InvokePipe,
  RenderablePipe,
  SchemaUtil,
  StylePipe,
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
    CdkDrag,
    CdkDropList,
    FluentGridModule,
    FluentWidgetWrapperOutlet,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentColumnPipe,
    FluentReactivePipe,
    InvokePipe,
    RenderablePipe,
    ClassPipe,
    StylePipe
  ],
  templateUrl: './form-array.widget.html',
  styleUrl: './form-array.widget.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
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
