import { NgClass, NgFor, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FluentBinderDirective, FluentComposableDirective, FluentWithContextGuardDirective } from '../../directives';
import { FluentCallPipe, FluentTypeofPipe } from '../../pipes';
import { FluentInvokePipe } from '../../pipes/invoke.pipe';
import { SelectControlSchema } from '../../schemas';
import { AbstractWidget, COL_HELPER, WidgetTemplateContext } from '../abstract.widget';

type SelectWidgetTemplateContext = WidgetTemplateContext<SelectControlSchema, FormControl>;

@Component({
  standalone: true,
  imports: [
    NgFor,
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    NzGridModule,
    NzSelectModule,
    FluentBinderDirective,
    FluentWithContextGuardDirective,
    FluentComposableDirective,
    FluentTypeofPipe,
    FluentCallPipe,
    FluentInvokePipe
  ],
  templateUrl: './select.widget.html',
  styles: [`nz-select { width: 100% }`]
})
export class SelectWidget extends AbstractWidget<SelectWidgetTemplateContext> {
  protected readonly infinity = Infinity;
  protected readonly helper = { col: COL_HELPER } as const;
}
