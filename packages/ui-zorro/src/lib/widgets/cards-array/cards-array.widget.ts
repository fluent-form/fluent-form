import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray } from '@angular/forms';
import { AbstractSchema, AbstractWidget, FluentBindingDirective, FluentColumnPipe, FluentContextGuardDirective, FluentFormItemOutletDirective, FluentGridModule, FluentReactivePipe, FluentTemplatePipe, FormUtil, InvokePipe, RenderablePipe, SchemaUtil, WidgetTemplateContext, WithoutSchemaReactiveFn, isBoolean, isNumber, isUndefined } from '@fluent-form/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AddableButton, CardsArraySchema } from '../../schemas';

type FormArrayWidgetTemplateContext = WidgetTemplateContext<CardsArraySchema, FormArray>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgTemplateOutlet,
    DragDropModule,
    NzCardModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzOutletModule,
    FluentGridModule,
    FluentFormItemOutletDirective,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentColumnPipe,
    FluentReactivePipe,
    FluentTemplatePipe,
    InvokePipe,
    RenderablePipe
  ],
  templateUrl: './cards-array.widget.html',
  styleUrls: ['./cards-array.widget.scss']
})
export class CardsArrayWidget extends AbstractWidget<FormArrayWidgetTemplateContext> {
  private readonly schemaUtil = inject(SchemaUtil);
  private readonly formUtil = inject(FormUtil);

  protected readonly helper = {
    length: {
      min: (length: CardsArraySchema['length']) => {
        return isNumber(length) ? length : length?.min ?? 0;
      },
      max: (length: CardsArraySchema['length']) => {
        return isNumber(length) ? length : length?.max ?? Infinity;
      },
    },
    addable: (addable: WithoutSchemaReactiveFn<CardsArraySchema['addable']>): AddableButton => {
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

  protected push(control: FormArray, schema: CardsArraySchema) {
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
