import { cascader, checkbox, date, datetime, FluentFormComponent, form, input, number, radio, range, rate, select, slider, switcher, textarea, time } from 'ngx-fluent-form';
import { CASCADER_OPTIONS, CHECKBOX_OPTIONS, RADIO_OPTIONS, SELECT_OPTIONS } from 'stories/control.options';
import { createStory } from 'stories/storybook.utils';

export const BasicExample = createStory<FluentFormComponent<{}>>({
  args: {
    schemas: form(
      input('text').label('文本输入框').span(24),
      textarea('textarea').label('文本框').span(24),
      number('number').label('数字输入框').span(24),
      date('date').label('日期录入框').span(24),
      range('range').label('区间日期录入框').span(24),
      datetime('datetime').label('日期时间录入框').span(24),
      time('time').label('时间录入框').span(24),
      switcher('switch').label('开关').placeholder(['启用', '禁用']).value(true).span(24),
      radio('radioGroup').label('单选框组').options(RADIO_OPTIONS).span(24),
      checkbox('checkboxGroup').label('复选框组').options(CHECKBOX_OPTIONS).span(24),
      select('select').label('选择器').options(SELECT_OPTIONS).span(24),
      cascader('cascader').label('联级选择器').options(CASCADER_OPTIONS).span(24),
      rate('rate').label('评分').value(2.5).span(24),
      slider('slider').label('滑动条').value(30).span(24),
    ),
    model: {}
  }
});