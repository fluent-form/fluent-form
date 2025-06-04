import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentContextGuardDirective, FluentReactivePipe, WidgetTemplateContext } from '@fluent-form/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconComponentSchema } from '../../schemas';

type IconWidgetTemplateContext = WidgetTemplateContext<IconComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NzIconModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe
  ],
  templateUrl: './icon.widget.html'
})
export class IconWidget extends AbstractWidget<IconWidgetTemplateContext> { }
