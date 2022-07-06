import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FluentFormComponent, form, input, radio, select } from 'ngx-fluent-form';
import { findSchema } from 'projects/ngx-fluent-form/src/utils/schema.utils';
import { AbstractFluentFormWrapperComponent } from '../../components/abstract-fluent-form-wrapper.component';
import { SELECT_OPTIONS } from '../../control.options';
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
    <pre>{{ model | json }}</pre>
  `,
  styleUrls: ['../../components/abstract-fluent-form-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
class FluentFormWrapperComponent extends AbstractFluentFormWrapperComponent {
  constructor() {
    super();

    this.schemas = form(
      select('select').label('控制内容').options(SELECT_OPTIONS).span(8).listener({
        valueChange: value => {
          this.model.text = value;
          this.model = { ...this.model };
        }
      }),
      radio('radio').label('控制显隐').span(8).options([
        { label: '显示', value: false },
        { label: '隐藏', value: true },
      ]).value(false).listener({
        valueChange: value => {
          findSchema(this.schemas, 'text')!.hidden = value;
          this.schemas = [...this.schemas];
        }
      }),
      input('text').label('文本输入框').span(8),
    );

    this.model = {}
  }
}

export default createMeta({
  title: 'FluentForm/Advanced',
  component: FluentFormWrapperComponent,
});

export const LinkageForm = createStory<FluentFormComponent<{}>>({});
