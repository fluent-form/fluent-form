import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentContextGuardDirective, FluentControlPipe, FluentWidgetTemplatePipe, FluentWithInjectorDirective, WidgetTemplateContext } from '@fluent-form/core';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { SpaceComponentSchema } from '../../schemas';

type SpaceWidgetTemplateContext = WidgetTemplateContext<SpaceComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgTemplateOutlet,
    ReactiveFormsModule,
    NzFlexDirective,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentWithInjectorDirective,
    FluentControlPipe,
    FluentWidgetTemplatePipe,
  ],
  templateUrl: './space.widget.html',
})
export class SpaceWidget extends AbstractWidget<SpaceWidgetTemplateContext> { }
