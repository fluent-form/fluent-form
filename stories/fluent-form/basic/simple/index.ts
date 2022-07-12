import { button, buttonGroup, cascader, checkbox, checkboxGroup, date, datetime, form, input, number, radio, range, rate, select, slider, switcher, textarea, time } from 'ngx-fluent-form';
import { CASCADER_OPTIONS, CHECKBOX_OPTIONS, RADIO_OPTIONS, SELECT_OPTIONS } from 'stories/options';
import { defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

export const story = defineStory({
  args: {
    schemas: form(
      input('text').label({ value: '文本输入框', tooltip: '小贴士' }).span(24).id('ipt'),
      textarea('textarea').label('文本框').span(24),
      number('number').label('数字输入框').span(24),
      date('date').label('日期录入框').span(24),
      range('range').label('区间日期录入框').span(24),
      datetime('datetime').label('日期时间录入框').span(24),
      time('time').label('时间录入框').span(24),
      switcher('switch').label('开关').placeholder(['启用', '禁用']).value(true).span(24),
      radio('radio').label('单选框组').options(RADIO_OPTIONS).span(24),
      checkbox('checkbox').label('单个复选框').content('同意').span(24),
      checkboxGroup('checkboxGroup').label('复选框组').options(CHECKBOX_OPTIONS).span(24),
      select('select').label('选择器').options(SELECT_OPTIONS).span(24),
      cascader('cascader').label('联级选择器').options(CASCADER_OPTIONS).span(24),
      rate('rate').label('评分').value(2.5).span(24),
      slider('slider').label('滑动条').value(30).span(24),
      button().subtype('primary').content('普通按钮'),
      button().subtype('primary').content('带图标的按钮').icon('check'),
      button().content('危险按钮').danger(true),
      buttonGroup().schemas(
        button().subtype('primary').content('确认'),
        button().content('取消'),
      )
    ),
    model: {}
  }
});

export const source = dedent`
  import { Component } from '@angular/core';
  import { button, cascader, checkbox, checkboxGroup, date, datetime, form, input, number, radio, range, rate, select, slider, switcher, textarea, time } from 'ngx-fluent-form';

  @Component({
    selector: 'example-component',
    template: \`<fluent-form [schemas]="schemas" [model]="model"></fluent-form>\`
  })
  export class ExampleComponent {
    schemas = form(
      input('text').label({ value: '文本输入框', tooltip: '小贴士' }).span(24).id('ipt'),
      textarea('textarea').label('文本框').span(24),
      number('number').label('数字输入框').span(24),
      date('date').label('日期录入框').span(24),
      range('range').label('区间日期录入框').span(24),
      datetime('datetime').label('日期时间录入框').span(24),
      time('time').label('时间录入框').span(24),
      switcher('switch').label('开关').placeholder(['启用', '禁用']).value(true).span(24),
      radio('radio').label('单选框组').options(RADIO_OPTIONS).span(24),
      checkbox('checkbox').label('单个复选框').content('同意').span(24),
      checkboxGroup('checkboxGroup').label('复选框组').options(CHECKBOX_OPTIONS).span(24),
      select('select').label('选择器').options(SELECT_OPTIONS).span(24),
      cascader('cascader').label('联级选择器').options(CASCADER_OPTIONS).span(24),
      rate('rate').label('评分').value(2.5).span(24),
      slider('slider').label('滑动条').value(30).span(24),
      button().subtype('primary').content('普通按钮'),
      button().subtype('primary').content('带图标的按钮').icon('check'),
      button().content('危险按钮').danger(true),
    );

    model = {};
  }
`;
