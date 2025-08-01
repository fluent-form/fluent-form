import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
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
  FluentTemplateOutlet,
  FluentTemplatePipe,
  FormUtil,
  InvokePipe,
  RenderablePipe,
  SchemaUtil,
  WidgetTemplateContext,
  WithoutSchemaReactiveFn,
  isBoolean,
  isUndefined
} from '@fluent-form/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { lengthHelper } from '../../helper';
import { AddableButton, FormArraySchema } from '../../schemas';

type FormArrayWidgetTemplateContext = WidgetTemplateContext<FormArraySchema, FormArray>;

/**
 * @internal
 */
@Component({
  imports: [
    NgTemplateOutlet,
    DragDropModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    FluentTemplateOutlet,
    FluentGridModule,
    FluentFormFieldOutletDirective,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentColumnPipe,
    FluentReactivePipe,
    FluentTemplatePipe,
    InvokePipe,
    RenderablePipe
  ],
  templateUrl: './form-array.widget.html',
  styleUrl: './form-array.widget.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormArrayWidget extends AbstractWidget<FormArrayWidgetTemplateContext> {
  private readonly schemaUtil = inject(SchemaUtil);
  private readonly formUtil = inject(FormUtil);

  protected readonly helper = {
    length: lengthHelper,
    addable: (addable: WithoutSchemaReactiveFn<FormArraySchema['addable']>): AddableButton => {
      if (isUndefined(addable) || isBoolean(addable)) {
        return {
          type: 'dashed',
          icon: 'plus',
          disabled: isBoolean(addable) ? !addable : false
        };
      }

      return addable;
    }
  } as const;

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

  protected withIndex(index: number, schema: AbstractSchema): AbstractSchema {
    return { ...schema, key: index };
  }
}
