import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractFormItemContentComponent } from '../../../components';
import { FluentWithInjectorDirective } from '../../../directives';
import { FluentWidgetTemplatePipe } from '../../../pipes';

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgTemplateOutlet,
    FluentWithInjectorDirective,
    FluentWidgetTemplatePipe,
  ],
  templateUrl: './form-item-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormItemContentComponent extends AbstractFormItemContentComponent { }
