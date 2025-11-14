import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractFormFieldContentComponent } from '../../../components';
import { FluentWithInjectorDirective } from '../../../directives';
import { FluentWidgetTemplatePipe } from '../../../pipes';

/**
 * @internal
 */
@Component({
  imports: [
    AsyncPipe,
    NgTemplateOutlet,
    FluentWithInjectorDirective,
    FluentWidgetTemplatePipe
  ],
  templateUrl: './form-field-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldContentComponent extends AbstractFormFieldContentComponent { }
