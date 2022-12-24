import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FluentBinderDirective, FluentComposableDirective, FluentWithContextGuardDirective } from '../../directives';
import { FluentCallPipe, FluentTypeofPipe } from '../../pipes';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type NumberWidgetTemplateContext = WidgetTemplateContext<any>;

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    NzGridModule,
    NzInputNumberModule,
    FluentBinderDirective,
    FluentWithContextGuardDirective,
    FluentComposableDirective,
    FluentTypeofPipe,
    FluentCallPipe
  ],
  templateUrl: './number.widget.html',
  styles: [`nz-input-number { width: 100% }`]
})
export class NumberWidget extends AbstractWidget<NumberWidgetTemplateContext> {
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<NumberWidgetTemplateContext>;

  protected readonly infinity = Infinity;
}
