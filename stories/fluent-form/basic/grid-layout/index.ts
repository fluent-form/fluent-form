import { date, datetime, form, input, number, rate, slider, textarea, time, toggle } from 'ngx-fluent-form';
import { defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

export const story = defineStory({
  args: {
    schemas: form(
      input('text').label('文本输入框').col(12),
      input('password').label('密码输入框').subtype('password').col(12),
      textarea('textarea').label('文本框').col(8),
      number('number').label('数字输入框').col({ span: 8, offset: 8 }),
      date('date').label('日期录入框').col(8),
      datetime('datetime').label('日期时间录入框').col(8),
      time('time').label('时间录入框').col(8),
      toggle('toggle').label('开关').placeholder(['启用', '禁用']).defaultValue(true).col({ flex: 'auto' }),
      rate('rate').label('评分').defaultValue(2.5).col({ flex: 1 }),
      slider('slider').label('滑动条').defaultValue(30).col({ flex: 3 }),
    ),
    model: {}
  }
});

export const source = dedent`
  import { Component } from '@angular/core';
  import { date, datetime, form, input, number, rate, slider, toggle, textarea, time } from 'ngx-fluent-form';

  @Component({
    selector: 'example-component',
    template: \`<fluent-form [schemas]="schemas" [(model)]="model"></fluent-form>\`
  })
  export class ExampleComponent {
    schemas = form(
      input('text').label('文本输入框').col(12),
      input('password').label('密码输入框').subtype('password').col(12),

      textarea('textarea').label('文本框').col(8),
      number('number').label('数字输入框').col({ span: 8, offset: 8 }),

      date('date').label('日期录入框').col(8),
      datetime('datetime').label('日期时间录入框').col(8),
      time('time').label('时间录入框').col(8),

      toggle('toggle').label('开关').placeholder(['启用', '禁用']).defaultValue(true).col({ flex: 'auto' }),
      rate('rate').label('评分').defaultValue(2.5).col({ flex: 1 }),
      slider('slider').label('滑动条').defaultValue(30).col({ flex: 3 }),
    );

    model = {};
  }
`;