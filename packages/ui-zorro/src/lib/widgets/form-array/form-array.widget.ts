import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgClass, NgFor, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray } from '@angular/forms';
import { AbstractSchema, AbstractWidget, FluentBindingDirective, FluentColumnPipe, FluentContextGuardDirective, FluentGridModule, FluentParentRowDirective, FluentReactivePipe, FluentTemplatePipe, FluentVarDirective, FormUtil, InvokePipe, RenderablePipe, SchemaUtil, WidgetTemplateContext, WithOutSchemaReactiveFn, isBoolean, isNumber, isUndefined } from '@fluent-form/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FluentFormItemContentComponent } from '../../components';
import { AddableButton, FormArraySchema } from '../../schemas';

type FormArrayWidgetTemplateContext = WidgetTemplateContext<FormArraySchema, FormArray>;

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
    DragDropModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,
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
    },
    addable: (addable: WithOutSchemaReactiveFn<FormArraySchema['addable']>): AddableButton => {
      if (isUndefined(addable) || isBoolean(addable)) {
        return {
          type: 'dashed',
          icon: 'plus',
          disabled: isBoolean(addable) ? !addable : false,
        };
      }

      return addable;
    }
  } as const;

  withIndex(index: number, schema: AbstractSchema): AbstractSchema {
    return { ...schema, key: index };
  }
}
