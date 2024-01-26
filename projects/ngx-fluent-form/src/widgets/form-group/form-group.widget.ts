import { NgClass, NgFor, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FluentFormItemOutletComponent, FluentGridModule } from '../../components';
import { FluentBindingDirective, FluentContextGuardDirective, FluentParentRowDirective } from '../../directives';
import { FluentColumnPipe, FluentControlPipe, FluentReactivePipe } from '../../pipes';
import { FormGroupSchema, SchemaKind } from '../../schemas';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type FormGroupWidgetTemplateContext = WidgetTemplateContext<FormGroupSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    NzFormModule,
    FluentGridModule,
    FluentFormItemOutletComponent,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentParentRowDirective,
    FluentColumnPipe,
    FluentReactivePipe,
    FluentControlPipe
  ],
  templateUrl: './form-group.widget.html',
})
export class FormGroupWidget extends AbstractWidget<FormGroupWidgetTemplateContext> {
  protected readonly SchemaKind = SchemaKind;
}
