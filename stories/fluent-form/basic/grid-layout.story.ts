import { date, datetime, FluentFormComponent, form, input, number, rate, slider, switcher, textarea, time } from 'ngx-fluent-form';
import { createStory } from 'stories/storybook.utils';

export const GridLayout = createStory<FluentFormComponent<{}>>({
  args: {
    schemas: form(
      input('text').label('文本输入框').span(12),
      input('password').label('密码输入框').subtype('password').span(12),
      textarea('textarea').label('文本框').span(24),
      number('number').label('数字输入框').span(24),
      date('date').label('日期录入框').span(8),
      datetime('datetime').label('日期时间录入框').span(8),
      time('time').label('时间录入框').span(8),
      switcher('switch').label('开关').placeholder(['启用', '禁用']).value(true).span(8),
      rate('rate').label('评分').value(2.5).span(8),
      slider('slider').label('滑动条').value(30).span(8),
    ),
    model: {}
  }
});
