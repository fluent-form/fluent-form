import { date, form } from 'ngx-fluent-form';
import { defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

export const story = defineStory({
  args: {
    schemas: form(
      date('date').label('日期控件').col(8).mapper({
        input: (o?: string) => o ? new Date(o) : new Date(),
        output: o => [o!.getFullYear(), o!.getMonth() + 1, o!.getDate()].join('/')
      })
    ),
    model: { date: '2022/2/22' }
  }
});

export const source = dedent`
  import { Component } from '@angular/core';
  import { date, form } from 'ngx-fluent-form';

  @Component({
    selector: 'example-component',
    template: \`<fluent-form [schemas]="schemas" [(model)]="model"></fluent-form>\`
  })
  export class ExampleComponent {
    schemas = form(
      date('date').label('日期控件').col(8).mapper({
        input: (o?: string) => o ? new Date(o) : new Date(),
        output: o => [o!.getFullYear(), o!.getMonth() + 1, o!.getDate()].join('/')
      })
    );

    model = { date: '2022/2/22' };
  }
`;