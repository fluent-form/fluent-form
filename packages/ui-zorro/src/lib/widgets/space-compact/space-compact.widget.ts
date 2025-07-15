import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  AbstractWidget,
  FluentBindingDirective,
  FluentContextGuardDirective,
  FluentControlPipe,
  FluentControlWrapperDirective,
  FluentWidgetTemplatePipe,
  FluentWithInjectorDirective,
  WidgetTemplateContext
} from '@fluent-form/core';
import { NzSpaceCompactComponent } from 'ng-zorro-antd/space';
import { SpaceCompactComponentSchema } from '../../schemas';

type SpaceCompactWidgetTemplateContext = WidgetTemplateContext<SpaceCompactComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  imports: [
    NgTemplateOutlet,
    NzSpaceCompactComponent,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentWithInjectorDirective,
    FluentControlPipe,
    FluentWidgetTemplatePipe,
    FluentControlWrapperDirective
  ],
  templateUrl: './space-compact.widget.html',
  styleUrl: './space-compact.widget.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpaceCompactWidget extends AbstractWidget<SpaceCompactWidgetTemplateContext> { }
