import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  AbstractWidget,
  FluentBindingDirective,
  FluentContextGuardDirective,
  FluentTemplateOutlet,
  FluentTemplatePipe,
  WidgetTemplateContext
} from '@fluent-form/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { HeadingComponentSchema } from '../../schemas';

type HeadingWidgetTemplateContext = WidgetTemplateContext<HeadingComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  imports: [
    NgTemplateOutlet,
    NzTypographyModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentTemplateOutlet,
    FluentTemplatePipe
  ],
  templateUrl: './heading.widget.html',
  styleUrl: './heading.widget.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HeadingWidget extends AbstractWidget<HeadingWidgetTemplateContext> { }
