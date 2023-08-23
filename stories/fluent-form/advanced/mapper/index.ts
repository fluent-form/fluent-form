import { date, form } from 'ngx-fluent-form';
import { defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

export const story = defineStory({
  args: {
    schema: form(() => {
      date('date').label('日期控件').col(8).mapper({
        parser: (o?: string) => o ? new Date(o) : new Date(),
        formatter: o => [o!.getFullYear(), o!.getMonth() + 1, o!.getDate()].join('/')
      });
    }),
    model: { date: '2022/2/22' }
  }
});

export const source = dedent`
  import { Component } from '@angular/core';
  import { date, form } from 'ngx-fluent-form';

  @Component({
    selector: 'example-component',
    template: \`<fluent-form [(model)]="model" [schema]="schema"></fluent-form>\`
  })
  export class ExampleComponent {
    schema = form(() => {
      date('date').label('日期控件').col(8).mapper({
        parser: (o?: string) => o ? new Date(o) : new Date(),
        formatter: o => [o!.getFullYear(), o!.getMonth() + 1, o!.getDate()].join('/')
      });
    });

    model = { date: '2022/2/22' };
  }
`;
