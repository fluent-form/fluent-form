import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FluentBindingDirective, FluentContextGuardDirective, FluentGridModule } from '../../../directives';
import { FluentColumnPipe, FluentReactivePipe } from '../../../pipes';
import { AbstractWidget, type WidgetTemplateContext } from '../../../widgets/widget';
import type { ButtonComponentSchema } from '../../schemas';

type ButtonWidgetTemplateContext = WidgetTemplateContext<ButtonComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  imports: [
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentGridModule,
    FluentColumnPipe
  ],
  templateUrl: './button.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonWidget extends AbstractWidget<ButtonWidgetTemplateContext> { }
