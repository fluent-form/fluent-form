import { button, buttonGroup, cascader, checkbox, checkboxGroup, date, dateRange, datetime, form, input, inputGroup, number, radioGroup, rate, select, slider, step, steps, tab, tabs, text, textarea, time, toggle, treeSelect } from 'ngx-fluent-form';
import { CASCADER_OPTIONS, CHECKBOX_OPTIONS, RADIO_OPTIONS, SELECT_OPTIONS, TREE_SELECT_OPTIONS } from 'stories/options';
import { defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

export const story = defineStory({
  args: {
    schemas: form(
      input('text')
        .label({ value: '文本输入框', tooltip: '小贴士' })
        .col(8)
        .id('ipt')
        .disabled('false')
        .autocomplete({
          options: ['a', 'b', 'c']
        }),
      number('number').label('数字输入框').col(8).disabled(o => (console.log(o), false)),
      inputGroup().label('姓与名称').col(8).schemas(
        input('first').placeholder('姓').col(8).autocomplete({
          options: [1, 2, 3]
        }),
        input('last').placeholder('名').col(16),
      ),
      textarea('textarea').label('文本框').col(24).autocomplete({
        options: [
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
          { label: 'C', value: 'c' }
        ]
      }),
      date('date').label('日期录入框').col(6).class('custom-class'),
      dateRange('date-range').label('区间日期录入框').col(6),
      datetime('datetime').label('日期时间录入框').col(6),
      time('time').label('时间录入框').col(6),
      toggle('toggle').label('开关').placeholder(['启用', '禁用']).defaultValue(true).col(12),
      radioGroup('radio-group').label('单选框组').options(RADIO_OPTIONS).col(12),
      checkbox('checkbox').label('单个复选框').content('同意').col(12),
      checkboxGroup('checkboxGroup').label('复选框组').options(CHECKBOX_OPTIONS).col(12),
      select('select').label('选择器').options(SELECT_OPTIONS).col(8),
      cascader('cascader').label('联级选择器').options(CASCADER_OPTIONS).col(8),
      treeSelect('treeSelect').label('树形选择器').options(TREE_SELECT_OPTIONS).expandedKeys(['100', '1001']).col(8),
      rate('rate').label('评分').defaultValue(2.5).col(12),
      slider('slider').label('滑动条').defaultValue(30).col(12),
      text().content('文本'),
      button().type('primary').content('普通按钮'),
      button().type('primary').content('带图标的按钮').icon('check'),
      button().content('危险按钮').danger(true),
      button().type('link').content('链接按钮'),
      buttonGroup().schemas(
        button().type('primary').content('确认'),
        button().content('取消'),
        button().content('看不见我').hidden(() => true),
        button().content('动态').hidden(({ model }) => model.slider < 50),
      ),
      steps().col(24).active(0).schemas(
        step().title('第一步').schemas(
          input('text1InStep1').label('文本输入框').placeholder('第一步的输入框').col(12),
          input('text2InStep1').label('文本输入框').placeholder('第一步的输入框').col(12),
        ),
        step().title('第二步').schemas(
          input('textInStep2').label('文本输入框').placeholder('第二步的输入框'),
        ),
        step().title('第三步').schemas(
          input('textInStep3').label('文本输入框').placeholder('第三步的输入框'),
        )
      ),
      tabs().col(24).schemas(
        tab().title('账号').schemas(
          input('textInTab1').label('账号').col(12),
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
  import { button, buttonGroup, cascader, checkbox, checkboxGroup, date, datetime, form, input, inputGroup, number, radioGroup, dateRange, rate, select, slider, step, steps, toggle, textarea, time } from 'ngx-fluent-form';

  @Component({
    selector: 'example-component',
    template: \`<fluent-form [schemas]="schemas" [(model)]="model"></fluent-form>\`
  })
  export class ExampleComponent {
    schemas = form(
      input('text')
        .label({ value: '文本输入框', tooltip: '小贴士' })
        .col(8)
        .id('ipt')
        .disabled('false')
        .autocomplete({
          options: ['a', 'b', 'c']
        }),
      number('number').label('数字输入框').col(8).disabled(o => (console.log(o), false)),
      inputGroup().label('姓与名称').col(8).schemas(
        input('first').placeholder('姓').col(8).autocomplete({
          options: [1, 2, 3]
        }),
        input('last').placeholder('名').col(16),
      ),
      textarea('textarea').label('文本框').col(24).autocomplete({
        options: [
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
          { label: 'C', value: 'c' }
        ]
      }),
      date('date').label('日期录入框').col(6),
      dateRange('date-range').label('区间日期录入框').col(6),
      datetime('datetime').label('日期时间录入框').col(6),
      time('time').label('时间录入框').col(6),
      toggle('toggle').label('开关').placeholder(['启用', '禁用']).defaultValue(true).col(12),
      radioGroup('radio-group').label('单选框组').options(RADIO_OPTIONS).col(12),
      checkbox('checkbox').label('单个复选框').content('同意').col(12),
      checkboxGroup('checkboxGroup').label('复选框组').options(CHECKBOX_OPTIONS).col(12),
      select('select').label('选择器').options(SELECT_OPTIONS).col(12),
      cascader('cascader').label('联级选择器').options(CASCADER_OPTIONS).col(12),
      rate('rate').label('评分').defaultValue(2.5).col(12),
      slider('slider').label('滑动条').defaultValue(30).col(12),
      text().content('文本'),
      button().type('primary').content('普通按钮'),
      button().type('primary').content('带图标的按钮').icon('check'),
      button().content('危险按钮').danger(true),
      buttonGroup().schemas(
        button().type('primary').content('确认'),
        button().content('取消'),
        button().content('看不见我').hidden(() => true),
        button().content('动态').hidden(({ model }) => model.slider < 50),
      ),
      steps().col(24).active(0).schemas(
        step().title('第一步').schemas(
          input('text1InStep1').label('文本输入框').placeholder('第一步的输入框').col(12),
          input('text2InStep1').label('文本输入框').placeholder('第一步的输入框').col(12),
        ),
        step().title('第二步').schemas(
          input('textInStep2').label('文本输入框').placeholder('第二步的输入框'),
        ),
        step().title('第三步').schemas(
          input('textInStep3').label('文本输入框').placeholder('第三步的输入框'),
        )
      ),
      tabs().col(24).schemas(
        tab().title('账号').schemas(
          input('textInTab1').label('账号').col(12),
        ),
        tab().title('手机号').schemas(
          input('textInTab2').label('手机号'),
        ),
        tab().title('禁用').disabled(true).schemas(
          input('textInTab3'),
        )
      )
    );

    model = {};
  }
`;
