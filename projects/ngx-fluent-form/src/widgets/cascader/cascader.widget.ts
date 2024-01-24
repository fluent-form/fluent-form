import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzFormNoStatusService } from 'ng-zorro-antd/core/form';
import { FluentGridModule } from '../../components';
import { FluentBindingDirective, FluentContextGuardDirective, FluentInjectDirective } from '../../directives';
import { FluentColumnPipe, FluentReactivePipe, FluentTemplatePipe } from '../../pipes';
import { CascaderControlSchema } from '../../schemas';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type CascaderWidgetTemplateContext = WidgetTemplateContext<CascaderControlSchema, FormControl<SafeAny[]>>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    NzCascaderModule,
    FluentGridModule,
    FluentInjectDirective,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentColumnPipe,
    FluentTemplatePipe
  ],
  templateUrl: './cascader.widget.html',
  styles: [`nz-cascader { width: 100% }`]
})
export class CascaderWidget extends AbstractWidget<CascaderWidgetTemplateContext> {
  protected readonly InputGroup = NzFormNoStatusService;
}
