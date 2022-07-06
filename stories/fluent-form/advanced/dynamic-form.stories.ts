import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { array, FluentFormComponent, form, FormArraySchema, input } from 'ngx-fluent-form';
import { findSchema } from 'projects/ngx-fluent-form/src/utils/schema.utils';
import { AbstractFluentFormWrapperComponent } from '../../components/abstract-fluent-form-wrapper.component';
import { createMeta, createStory } from '../../storybook.utils';

registerLocaleData(zh);

@Component({
  selector: 'fluent-form-warpper',
  template: `
    <fluent-form
      [schemas]="schemas"
      [(model)]="model"
      [layout]="layout"
      [colon]="colon"
      [spinning]="spinning"
      [spinTip]="spinTip"
      [spinSize]="spinSize"></fluent-form>

    <div style="margin-left: 15px;">
      <button style="display: block" (click)="add()">添加控件</button>
      <button style="display: block" (click)="remove()">删除控件</button>
    </div>

    <pre>{{ model | json }}</pre>
  `,
  styleUrls: ['../../components/abstract-fluent-form-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
class FluentFormWrapperComponent extends AbstractFluentFormWrapperComponent {
  constructor() {
    super();

    this.schemas = form(
      array('passengers').span(24).schemas(
        input().label('乘客').span(12),
      )
    );

    this.model = {}
  }

  add() {
    const array = findSchema<FormArraySchema>(this.schemas, 'passengers')!;
    array.schemas.push(
      input().label('乘客').span(12).build()
    );
    array.schemas = [...array.schemas];
    this.schemas = [...this.schemas];
  }

  remove() {
    const array = findSchema<FormArraySchema>(this.schemas, 'passengers')!;
    array.schemas.pop();
    array.schemas = [...array.schemas];
    this.schemas = [...this.schemas];
  }
}

export default createMeta({
  title: 'FluentForm/Advanced',
  component: FluentFormWrapperComponent,
});

export const DynamicForm = createStory<FluentFormComponent<{}>>({});
