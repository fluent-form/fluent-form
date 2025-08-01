import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractFormFieldContentComponent } from '../../../components';
import { FluentWithInjectorDirective } from '../../../directives';
import { FluentWidgetTemplatePipe } from '../../../pipes';

/**
 * @internal
 */
@Component({
  imports: [
    NgTemplateOutlet,
    FluentWithInjectorDirective,
    FluentWidgetTemplatePipe
  ],
  templateUrl: './form-field-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldContentComponent extends AbstractFormFieldContentComponent { }
