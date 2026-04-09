import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Directive, ElementRef, inject } from '@angular/core';
import { FormArray } from '@angular/forms';
import {
  AbstractFormArraySchema,
  AbstractSchema,
  AbstractWidget,
  ClassPipe,
  FluentBindingDirective,
  FluentContextGuardDirective,
  FluentControlPipe,
  FluentGridModule,
  FluentReactivePipe,
  FluentWidgetWrapperOutlet,
  FluentWithInjectorDirective,
  FormUtil,
  InvokePipe,
  isBoolean,
  isUndefined,
  RenderablePipe,
  SchemaUtil,
  StylePipe,
  WidgetTemplateContext,
  WithoutSchemaReactiveFn
} from '@fluent-form/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormStatusService } from 'ng-zorro-antd/core/form';
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
 * nz-table 外面会被 nz-form-control 包裹，而 nz-form-control 会提供一个 NzFormStatusService。
 * control 组件会注入这个服务，导致 control 组件的状态被 NzFormStatusService 控制，从而无法正确反映 control 的状态。
 * 因此需要覆盖掉 NzFormStatusService 的提供者，提供一个空的服务实例。
 */
@Directive({
  selector: 'nz-table',
  providers: [{ provide: NzFormStatusService, useValue: null }]
})
export class OverrideProvidersDirective { }

/**
 * @internal
 */
@Component({
  imports: [
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
    FluentWidgetWrapperOutlet,
    FluentWithInjectorDirective,
    ElementDirective,
    ClassPipe,
    StylePipe,
    OverrideProvidersDirective
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
