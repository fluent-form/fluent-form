import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgClass, NgFor, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FluentFormColContentOutletComponent } from '../../components';
import { FluentBindingDirective, FluentConfigDirective, FluentContextGuardDirective, FluentVarDirective } from '../../directives';
import { FluentColumnPipe, FluentReactivePipe, FluentTemplatePipe, InvokePipe } from '../../pipes';
import { AbstractSchema, AddableButton, FormArraySchema, SchemaKind, WithOutSchemaReactiveFn } from '../../schemas';
import { FormUtil, SchemaUtil, isBoolean, isNumber, isUndefined } from '../../utils';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

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
    NzGridModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzOutletModule,
    FluentFormColContentOutletComponent,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentConfigDirective,
    FluentColumnPipe,
    FluentReactivePipe,
    FluentTemplatePipe,
    FluentVarDirective,
    InvokePipe
  ],
  templateUrl: './form-array.widget.html',
  styleUrls: ['./form-array.widget.scss']
})
export class FormArrayWidget extends AbstractWidget<FormArrayWidgetTemplateContext> {
  private readonly schemaUtil = inject(SchemaUtil);
  private readonly formUtil = inject(FormUtil);

  protected readonly SchemaKind = SchemaKind;

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
