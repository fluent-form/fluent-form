import { NgClass, NgFor, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FluentFormColContentOutletComponent } from '../../components';
import { FluentBindingDirective, FluentConfigDirective, FluentContextGuardDirective } from '../../directives';
import { FluentCallPipe, FluentColumnPipe } from '../../pipes';
import { FormArraySchema, StandardSchema } from '../../schemas';
import { FormUtil, SchemaUtil } from '../../utils';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type FormArrayWidgetTemplateContext = WidgetTemplateContext<FormArraySchema, FormArray>;

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    NzGridModule,
    NzFormModule,
    NzButtonModule,
    NzDividerModule,
    NzIconModule,
    FluentFormColContentOutletComponent,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentConfigDirective,
    FluentColumnPipe,
    FluentCallPipe
  ],
  templateUrl: './form-array.widget.html'
})
export class FormArrayWidget extends AbstractWidget<FormArrayWidgetTemplateContext> {
  private readonly schemaUtil = inject(SchemaUtil);
  private readonly formUtil = inject(FormUtil);

  add(control: FormArray, schema: StandardSchema<FormArraySchema>) {
    const [elementSchema] = this.schemaUtil.filterControlSchemas(schema.schemas);

    control.push(
      this.formUtil.createAnyControl(elementSchema, {})
    );
  }
}
