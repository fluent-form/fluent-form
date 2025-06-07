import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  AbstractWidget,
  FluentBindingDirective,
  FluentColumnPipe,
  FluentContextGuardDirective,
  FluentControlWrapperDirective,
  FluentGridModule,
  FluentInjectPipe,
  FluentReactivePipe,
  FluentTemplatePipe,
  InvokePipe,
  WidgetTemplateContext
} from '@fluent-form/core';
import { AnyObject, SafeAny } from '@ngify/core';
import { NzCascaderModule, NzCascaderOption } from 'ng-zorro-antd/cascader';
import { CascaderControlSchema } from '../../schemas';

type CascaderWidgetTemplateContext = WidgetTemplateContext<CascaderControlSchema, FormControl<SafeAny[]>>;

/**
 * @internal
 */
@Component({
  imports: [
    ReactiveFormsModule,
    NzCascaderModule,
    FluentGridModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentColumnPipe,
    FluentTemplatePipe,
    FluentInjectPipe,
    InvokePipe
  ],
  templateUrl: './cascader.widget.html',
  styles: [`nz-cascader { width: 100% }`]
})
export class CascaderWidget extends AbstractWidget<CascaderWidgetTemplateContext> {
  protected readonly ControlWrapperDirective = FluentControlWrapperDirective;

  fetchOptions(model: AnyObject, schema: CascaderControlSchema, control: FormControl) {
    return (node: NzCascaderOption, index: number) =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      schema.fetchOptions?.(node, index, { model, schema, control })!;
  }
}
