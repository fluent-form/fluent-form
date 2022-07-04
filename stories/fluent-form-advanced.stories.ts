import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component } from '@angular/core';
import { form, input, select } from 'ngx-fluent-form';
import { AbstractFluentFormWrapperComponent } from './components/abstract-fluent-form-wrapper.component';
import { SELECT_OPTIONS } from './control.options';
import { createMeta, createStory } from './storybook.utils';

registerLocaleData(zh);

@Component({
  selector: 'fluent-form-warpper',
  template: `
    <fluent-form
      [schemas]="schemas"
      [model]="model"
      [layout]="layout"
      [colon]="colon"
      [spinning]="spinning"
      [spinTip]="spinTip"
      [spinSize]="spinSize"></fluent-form>
    <pre>{{ model | json }}</pre>
  `,
  styleUrls: ['./components/abstract-fluent-form-wrapper.component.scss']
})
class FluentFormWrapperComponent extends AbstractFluentFormWrapperComponent {
  override schemas = form(
    select('select').label('选择器').options(SELECT_OPTIONS).span(8).listener({
      valueChange: value => {
        this.model.text = value;
        this.model = { ...this.model };
      }
    }),
    input('text').label('文本输入框').span(8),
  );

  override model: { text?: string, select?: string } = {}
}

export default createMeta({
  title: 'FluentForm/Advanced',
  component: FluentFormWrapperComponent,
});

export const LinkageForm = createStory<FluentFormWrapperComponent>({});
