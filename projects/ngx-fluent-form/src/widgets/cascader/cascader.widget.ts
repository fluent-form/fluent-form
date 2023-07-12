import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzFormNoStatusService } from 'ng-zorro-antd/core/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FluentBindingDirective, FluentContextGuardDirective, FluentInjectDirective } from '../../directives';
import { FluentColumnPipe, FluentReactivePipe, TypeofPipe } from '../../pipes';
import { CascaderControlSchema } from '../../schemas';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type CascaderWidgetTemplateContext = WidgetTemplateContext<CascaderControlSchema, FormControl<SafeAny[]>>;

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    NzGridModule,
    NzCascaderModule,
    FluentInjectDirective,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentColumnPipe,
    TypeofPipe
  ],
  templateUrl: './cascader.widget.html',
  styles: [`nz-cascader { width: 100% }`]
})
export class CascaderWidget extends AbstractWidget<CascaderWidgetTemplateContext> {
  protected readonly NzFormNoStatusService = NzFormNoStatusService;
}
