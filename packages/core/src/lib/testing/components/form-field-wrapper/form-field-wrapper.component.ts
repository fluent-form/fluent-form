import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractWidgetWrapper } from '../../../components';
import { FluentNextWidgetWrapperOutlet } from '../../../directives';

/**
 * @internal
 */
@Component({
  imports: [FluentNextWidgetWrapperOutlet],
  templateUrl: './form-field-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldWrapper extends AbstractWidgetWrapper { }
