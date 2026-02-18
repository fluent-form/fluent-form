import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  AbstractWidget,
  ClassPipe,
  FluentBindingDirective,
  FluentContextGuardDirective,
  FluentReactivePipe,
  StylePipe,
  WidgetTemplateContext
} from '@fluent-form/core';
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
    FluentReactivePipe,
    ClassPipe,
    StylePipe
  ],
  templateUrl: './icon.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class IconWidget extends AbstractWidget<IconWidgetTemplateContext> { }
