import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentContextGuardDirective, FluentReactivePipe, WidgetTemplateContext } from '@fluent-form/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconComponentSchema } from '../../schemas';

type IconWidgetTemplateContext = WidgetTemplateContext<IconComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  imports: [
    NzIconModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe
  ],
  templateUrl: './icon.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class IconWidget extends AbstractWidget<IconWidgetTemplateContext> { }
