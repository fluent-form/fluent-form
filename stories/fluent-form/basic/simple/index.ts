import { button, buttonGroup, cascader, checkbox, checkboxGroup, date, datetime, form, input, inputGroup, number, radio, range, rate, select, slider, step, steps, switcher, tab, tabset, textarea, time } from 'ngx-fluent-form';
import { CASCADER_OPTIONS, CHECKBOX_OPTIONS, RADIO_OPTIONS, SELECT_OPTIONS } from 'stories/options';
import { defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

export const story = defineStory({
  args: {
    schemas: form(
      input('text').label({ value: '文本输入框', tooltip: '小贴士' }).span(8).id('ipt'),
      number('number').label('数字输入框').span(8),
      inputGroup().label('姓与名称').span(8).schemas(
        input('first').placeholder('姓').span(8),
        input('last').placeholder('名').span(16),
      ),
      textarea('textarea').label('文本框').span(24),
      date('date').label('日期录入框').span(6),
      range('range').label('区间日期录入框').span(6),
      datetime('datetime').label('日期时间录入框').span(6),
      time('time').label('时间录入框').span(6),
      switcher('switch').label('开关').placeholder(['启用', '禁用']).value(true).span(12),
      radio('radio').label('单选框组').options(RADIO_OPTIONS).span(12),
      checkbox('checkbox').label('单个复选框').content('同意').span(12),
      checkboxGroup('checkboxGroup').label('复选框组').options(CHECKBOX_OPTIONS).span(12),
      select('select').label('选择器').options(SELECT_OPTIONS).span(12),
      cascader('cascader').label('联级选择器').options(CASCADER_OPTIONS).span(12),
      rate('rate').label('评分').value(2.5).span(12),
      slider('slider').label('滑动条').value(30).span(12),
      button().style('primary').content('普通按钮'),
      button().style('primary').content('带图标的按钮').icon('check'),
      button().content('危险按钮').danger(true),
      buttonGroup().schemas(
        button().style('primary').content('确认'),
        button().content('取消'),
        button().content('看不见我').hidden(() => true),
        button().content('动态').hidden((model: any) => model.slider < 50),
      ),
      steps().span(24).active(0).schemas(
        step().title('第一步').schemas(
          input('text1InStep1').label('文本输入框').placeholder('第一步的输入框').span(12),
          input('text2InStep1').label('文本输入框').placeholder('第一步的输入框').span(12),
        ),
        step().title('第二步').schemas(
          input('textInStep2').label('文本输入框').placeholder('第二步的输入框'),
        ),
        step().title('第三步').schemas(
          input('textInStep3').label('文本输入框').placeholder('第三步的输入框'),
        )
      ),
      tabset().span(24).schemas(
        tab().title('账号').schemas(
          input('textInTab1').label('账号').span(12),
        ),
        tab().title('手机号').schemas(
          input('textInTab2').label('手机号'),
        ),
        tab().title('禁用').disabled(true).schemas(
          input('textInTab3'),
        )
      )
    ),
    model: {}
  }
});

export const source = dedent`
  import { Component } from '@angular/core';
  import { button, buttonGroup, cascader, checkbox, checkboxGroup, date, datetime, form, input, inputGroup, number, radio, range, rate, select, slider, step, steps, switcher, textarea, time } from 'ngx-fluent-form';

  @Component({
    selector: 'example-component',
    template: \`<fluent-form [schemas]="schemas" [(model)]="model"></fluent-form>\`
  })
  export class ExampleComponent {
    schemas = form(
      input('text').label({ value: '文本输入框', tooltip: '小贴士' }).span(8).id('ipt'),
      number('number').label('数字输入框').span(8),
      inputGroup().label('姓与名称').span(8).schemas(
        input('first').placeholder('姓').span(8),
        input('last').placeholder('名').span(16),
      ),
      textarea('textarea').label('文本框').span(24),
      date('date').label('日期录入框').span(6),
      range('range').label('区间日期录入框').span(6),
      datetime('datetime').label('日期时间录入框').span(6),
      time('time').label('时间录入框').span(6),
      switcher('switch').label('开关').placeholder(['启用', '禁用']).value(true).span(12),
      radio('radio').label('单选框组').options(RADIO_OPTIONS).span(12),
      checkbox('checkbox').label('单个复选框').content('同意').span(12),
      checkboxGroup('checkboxGroup').label('复选框组').options(CHECKBOX_OPTIONS).span(12),
      select('select').label('选择器').options(SELECT_OPTIONS).span(12),
      cascader('cascader').label('联级选择器').options(CASCADER_OPTIONS).span(12),
      rate('rate').label('评分').value(2.5).span(12),
      slider('slider').label('滑动条').value(30).span(12),
      button().style('primary').content('普通按钮'),
      button().style('primary').content('带图标的按钮').icon('check'),
      button().content('危险按钮').danger(true),
      buttonGroup().schemas(
        button().style('primary').content('确认'),
        button().content('取消'),
        button().content('看不见我').hidden(() => true),
        button().content('动态').hidden((model: any) => model.slider < 50),
      ),
      steps().span(24).active(0).schemas(
        step().title('第一步').schemas(
          input('text1InStep1').label('文本输入框').placeholder('第一步的输入框').span(12),
          input('text2InStep1').label('文本输入框').placeholder('第一步的输入框').span(12),
        ),
        step().title('第二步').schemas(
          input('textInStep2').label('文本输入框').placeholder('第二步的输入框'),
        ),
        step().title('第三步').schemas(
          input('textInStep3').label('文本输入框').placeholder('第三步的输入框'),
        )
      )
    ),
    );

    model = {};
  }
`;
