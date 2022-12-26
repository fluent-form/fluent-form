import { NgClass, NgStyle } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FluentBinderDirective, FluentComposableDirective, FluentWithContextGuardDirective } from '../../directives';
import { FluentCallPipe, FluentTypeofPipe } from '../../pipes';
import { FluentInvokePipe } from '../../pipes/invoke.pipe';
import { CascaderControlSchema } from '../../schemas';
import { AbstractWidget, COL_HELPER, WidgetTemplateContext } from '../abstract.widget';

type CascaderWidgetTemplateContext = WidgetTemplateContext<CascaderControlSchema, FormControl<Date>>;

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
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<CascaderWidgetTemplateContext>;

  protected readonly helper = { col: COL_HELPER } as const;
}
