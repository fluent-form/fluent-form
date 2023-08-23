import { dateRange, form } from 'ngx-fluent-form';
import { defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

export const story = defineStory({
  args: {
    schema: form(() => {
      dateRange(['start', 'end']).label('日期区间控件').col(12);
    }),
    model: {}
  }
});

export const source = dedent`
  import { Component } from '@angular/core';
  import { form, dateRange } from 'ngx-fluent-form';

  @Component({
    selector: 'example-component',
    template: \`<fluent-form [(model)]="model" [schema]="schema"></fluent-form>\`
  })
  export class ExampleComponent {
    schema = form(() => {
      dateRange(['start', 'end']).label('日期区间控件').col(12);
    });

    model = {};
  }
`;
