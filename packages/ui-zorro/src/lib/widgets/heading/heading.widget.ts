import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
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
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NzTypographyModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentTemplateOutlet,
    FluentTemplatePipe
  ],
  templateUrl: './heading.widget.html',
  styleUrls: ['./heading.widget.scss']
})
export class HeadingWidget extends AbstractWidget<HeadingWidgetTemplateContext> { }
