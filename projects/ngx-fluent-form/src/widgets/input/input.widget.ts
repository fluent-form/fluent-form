import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FluentBinderDirective, FluentComposableDirective, FluentWithContextGuardDirective } from '../../directives';
import { FluentCallPipe, FluentTypeofPipe } from '../../pipes';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type InputWidgetTemplateContext = WidgetTemplateContext<any>;

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    NzInputModule,
    NzGridModule,
    NzAutocompleteModule,
    FluentBinderDirective,
    FluentWithContextGuardDirective,
    FluentComposableDirective,
    FluentTypeofPipe,
    FluentCallPipe
  ],
  templateUrl: './input.widget.html',
})
export class InputWidget extends AbstractWidget<InputWidgetTemplateContext> {
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<InputWidgetTemplateContext>;
}
