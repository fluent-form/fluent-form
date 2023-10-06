import { NgClass, NgIf, NgStyle, NgSwitch, NgSwitchCase, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { FluentBindingDirective, FluentContextGuardDirective } from '../../directives';
import { FluentReactivePipe, FluentTemplatePipe } from '../../pipes';
import { HeadingComponentSchema } from '../../schemas';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type HeadingWidgetTemplateContext = WidgetTemplateContext<HeadingComponentSchema, FormGroup>;

@Component({
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgIf,
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    NzTypographyModule,
    NzOutletModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentTemplatePipe
  ],
  templateUrl: './heading.widget.html',
  styleUrls: ['./heading.widget.scss']
})
export class HeadingWidget extends AbstractWidget<HeadingWidgetTemplateContext> { }
