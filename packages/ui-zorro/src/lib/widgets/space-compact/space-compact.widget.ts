import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentContextGuardDirective, FluentControlPipe, FluentControlWrapperDirective, FluentWidgetTemplatePipe, FluentWithInjectorDirective, WidgetTemplateContext } from '@fluent-form/core';
import { SpaceCompactComponentSchema } from '../../schemas';
import { NzSpaceCompactComponent } from './lib/space-compact.component';

type SpaceCompactWidgetTemplateContext = WidgetTemplateContext<SpaceCompactComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NzSpaceCompactComponent,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentWithInjectorDirective,
    FluentControlPipe,
    FluentWidgetTemplatePipe,
    FluentControlWrapperDirective,
  ],
  templateUrl: './space-compact.widget.html',
  styleUrl: './space-compact.widget.scss'
})
export class SpaceCompactWidget extends AbstractWidget<SpaceCompactWidgetTemplateContext> { }
