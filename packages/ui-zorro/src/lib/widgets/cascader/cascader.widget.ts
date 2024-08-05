import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentColumnPipe, FluentContextGuardDirective, FluentGridModule, FluentInjectDirective, FluentReactivePipe, FluentTemplatePipe, InvokePipe, WidgetTemplateContext } from '@fluent-form/core';
import { AnyObject, SafeAny } from '@ngify/types';
import { NzCascaderModule, NzCascaderOption } from 'ng-zorro-antd/cascader';
import { NzFormNoStatusService } from 'ng-zorro-antd/core/form';
import { CascaderControlSchema } from '../../schemas';

type CascaderWidgetTemplateContext = WidgetTemplateContext<CascaderControlSchema, FormControl<SafeAny[]>>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgStyle,
    ReactiveFormsModule,
    NzCascaderModule,
    FluentGridModule,
    FluentInjectDirective,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentColumnPipe,
    FluentTemplatePipe,
    InvokePipe
  ],
  templateUrl: './cascader.widget.html',
  styles: [`nz-cascader { width: 100% }`]
})
export class CascaderWidget extends AbstractWidget<CascaderWidgetTemplateContext> {
  protected readonly InputGroup = NzFormNoStatusService;

  fetchOptions(model: AnyObject, schema: CascaderControlSchema, control: FormControl) {
    return (node: NzCascaderOption, index: number) =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      schema.fetchOptions?.(node, index, { model, schema, control })!;
  }
}
