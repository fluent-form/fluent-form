import { form, range } from 'ngx-fluent-form';
import { defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

export const story = defineStory({
  args: {
    schemas: form(
      range(['start', 'end']).label('日期区间控件').span(12),
    ),
    model: {}
  }
});

export const source = dedent`
  import { Component } from '@angular/core';
  import { form, range } from 'ngx-fluent-form';

  @Component({
    selector: 'example-component',
    template: \`<fluent-form [schemas]="schemas" [(model)]="model"></fluent-form>\`
  })
  export class ExampleComponent {
    schemas = form(
      range(['start', 'end']).label('日期区间控件').span(12),
    );

    model = {};
  }
`;