import { Component } from '@angular/core';
import { form, input, radio, select } from 'ngx-fluent-form';
import { AbstractFluentFormWrapperComponent, defineMeta, defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

const SELECT_OPTIONS = [
  { label: 'Jack', value: 'jack' },
  { label: 'Lucy', value: 'lucy' },
  { label: 'Disabled', value: 'disabled', disabled: true }
];

@Component({
  selector: 'fluent-form-wrapper',
  template: `
    <div nz-row nzGutter="20">
      <fluent-form
        nz-col
        nzFlex="2"
        [schemas]="schemas"
        [(model)]="model"
        [layout]="layout"
        [colon]="colon"
        [spinning]="spinning"
        [spinTip]="spinTip"
        [spinSize]="spinSize"></fluent-form>

      <div nz-col nzFlex="1">
        <pre>{{ model | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    pre { padding: 5px; background: #f5f5f5; border: 1px solid #e0e0e0 }
  `]
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
      radio('radio').label('控制显隐').span(8).value(true).options([
        { label: '显示', value: true },
        { label: '隐藏', value: false },
      ]),
      input('text').label('文本输入框').span(8).hidden((model: { radio: boolean }) => !model.radio),
    );

    this.model = {}
  }
}

export const meta = defineMeta({
  component: FluentFormWrapperComponent
});

export const story = defineStory();

export const source = dedent`
  import { Component } from '@angular/core';
  import { form, input, radio, select } from 'ngx-fluent-form';

  const SELECT_OPTIONS = [
    { label: 'Jack', value: 'jack' },
    { label: 'Lucy', value: 'lucy' },
    { label: 'Disabled', value: 'disabled', disabled: true }
  ];

  @Component({
    selector: 'example-component',
    template: \`<fluent-form [schemas]="schemas" [(model)]="model"></fluent-form>\`
  })
  export class ExampleComponent {
    schemas = form(
      select('select').label('控制内容').options(SELECT_OPTIONS).span(8).listener({
        valueChange: value => {
          this.model.text = value;
          this.model = { ...this.model };
        }
      }),
      radio('radio').label('控制显隐').span(8).value(true).options([
        { label: '显示', value: true },
        { label: '隐藏', value: false },
      ]),
      input('text').label('文本输入框').span(8).hidden((model: { radio: boolean }) => !model.radio),
    );

    model = {};
  }
`;