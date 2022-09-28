import { date, datetime, form, input, number, rate, slider, textarea, time, toggle } from 'ngx-fluent-form';
import { defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

export const story = defineStory({
  args: {
    schemas: form(
      input('text').label('文本输入框').span(12),
      input('password').label('密码输入框').subtype('password').span(12),
      textarea('textarea').label('文本框').span(8),
      number('number').label('数字输入框').span(8).offset(8),
      date('date').label('日期录入框').span(8),
      datetime('datetime').label('日期时间录入框').span(8),
      time('time').label('时间录入框').span(8),
      toggle('toggle').label('开关').placeholder(['启用', '禁用']).value(true).flex('auto'),
      rate('rate').label('评分').value(2.5).flex(1),
      slider('slider').label('滑动条').value(30).flex(3),
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
      input('text').label('文本输入框').span(12),
      input('password').label('密码输入框').subtype('password').span(12),

      textarea('textarea').label('文本框').span(8),
      number('number').label('数字输入框').span(8).offset(8),

      date('date').label('日期录入框').span(8),
      datetime('datetime').label('日期时间录入框').span(8),
      time('time').label('时间录入框').span(8),

      toggle('toggle').label('开关').placeholder(['启用', '禁用']).value(true).flex('auto'),
      rate('rate').label('评分').value(2.5).flex(1),
      slider('slider').label('滑动条').value(30).flex(3),
    );

    model = {};
  }
`;