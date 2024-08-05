import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray } from '@angular/forms';
import { AbstractSchema, AbstractWidget, FluentBindingDirective, FluentColumnPipe, FluentContextGuardDirective, FluentFormItemOutletDirective, FluentGridModule, FluentParentRowDirective, FluentReactivePipe, FormUtil, InvokePipe, RenderablePipe, SchemaUtil, WidgetTemplateContext, isNumber } from '@fluent-form/core';
import { FormArraySchema } from '../../schemas';

type FormArrayWidgetTemplateContext = WidgetTemplateContext<FormArraySchema, FormArray>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgStyle,
    NgTemplateOutlet,
    DragDropModule,
    FluentGridModule,
    FluentFormItemOutletDirective,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentParentRowDirective,
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
      },
    }
  } as const;

  withIndex(index: number, schema: AbstractSchema): AbstractSchema {
    return { ...schema, key: index };
  }
}
