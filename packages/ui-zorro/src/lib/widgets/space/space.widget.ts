import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
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
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { SpaceComponentSchema } from '../../schemas';

type SpaceWidgetTemplateContext = WidgetTemplateContext<SpaceComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  imports: [
    AsyncPipe,
    NgTemplateOutlet,
    ReactiveFormsModule,
    NzFlexDirective,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentWithInjectorDirective,
    FluentControlPipe,
    FluentWidgetTemplatePipe,
    FluentControlWrapperDirective
  ],
  templateUrl: './space.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class SpaceWidget extends AbstractWidget<SpaceWidgetTemplateContext> { }
