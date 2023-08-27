import { array, datetime, form, input } from 'ngx-fluent-form';
import { defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

export const story = defineStory({
  args: {
    schema: form(() => {
      input('flight').label('航班').required(true).col(11);
      datetime('boardingTime').label('登机时间').required(true).col(11);
      array('passengers').label('乘客').length({ min: 1, max: 5 }).orderable(true).col(22).schemas(() => {
        input().placeholder('请输入姓名').col(24);
      });
    }),
    model: {
      passengers: ['男一号']
    }
  }
});

export const source = dedent`
  import { Component } from '@angular/core';
  import { array, datetime, form, input } from 'ngx-fluent-form';

  @Component({
    selector: 'example-component',
    template: \`<fluent-form [(model)]="model" [schema]="schema"></fluent-form>\`
  })
  export class ExampleComponent {
    schema = form(() => {
      input('flight').label('航班').required(true).col(11);
      datetime('boardingTime').label('登机时间').required(true).col(11);
      array('passengers').label('乘客').length({ min: 1, max: 5 }).orderable(true).col(22).schemas(() => {
        input().placeholder('请输入姓名').col(24);
      });
    });

    model = {
      passengers: ['男一号']
    };
  }
`;
