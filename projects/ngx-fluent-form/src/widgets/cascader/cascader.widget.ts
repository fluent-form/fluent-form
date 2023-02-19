import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FluentBinderDirective, FluentComposableDirective, FluentWithContextGuardDirective } from '../../directives';
import { FluentCallPipe, FluentTypeofPipe } from '../../pipes';
import { FluentInvokePipe } from '../../pipes/invoke.pipe';
import { CascaderControlSchema } from '../../schemas';
import { AbstractWidget, COL_HELPER, WidgetTemplateContext } from '../abstract.widget';

type CascaderWidgetTemplateContext = WidgetTemplateContext<CascaderControlSchema, FormControl<SafeAny[]>>;

@Component({
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    NzGridModule,
    NzCascaderModule,
    FluentBinderDirective,
    FluentWithContextGuardDirective,
    FluentComposableDirective,
    FluentTypeofPipe,
    FluentCallPipe,
    FluentInvokePipe
  ],
  templateUrl: './cascader.widget.html',
  styles: [`nz-cascader { width: 100% }`]
})
export class CascaderWidget extends AbstractWidget<CascaderWidgetTemplateContext> {
  protected readonly helper = { col: COL_HELPER } as const;
}
