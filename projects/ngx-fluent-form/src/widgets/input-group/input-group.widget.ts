import { NgClass, NgFor, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FluentControlOutletComponent } from '../../components';
import { FluentBinderDirective, FluentWithContextGuardDirective, FluentWithInjectorDirective } from '../../directives';
import { FluentCallPipe, FluentControlPipe, FluentTypeofPipe, FluentWidgetTemplateRefPipe } from '../../pipes';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type InputGroupWidgetTemplateContext = WidgetTemplateContext<any, FormGroup>;

@Component({
  standalone: true,
  imports: [
    NgFor,
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    ReactiveFormsModule,
    NzInputModule,
    FluentBinderDirective,
    FluentWithContextGuardDirective,
    FluentWithInjectorDirective,
    FluentTypeofPipe,
    FluentCallPipe,
    FluentControlPipe,
    FluentWidgetTemplateRefPipe,
    FluentControlOutletComponent,
  ],
  templateUrl: './input-group.widget.html',
})
export class InputGroupWidget extends AbstractWidget<InputGroupWidgetTemplateContext> {
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<InputGroupWidgetTemplateContext>;
}
