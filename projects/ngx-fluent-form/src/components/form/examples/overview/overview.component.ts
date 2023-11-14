import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { alert, button, buttonGroup, cascader, checkbox, checkboxGroup, date, dateRange, datetime, FluentFormComponent, form, heading5, headless, input, inputGroup, number, radioGroup, rate, row, select, slider, space, step, steps, tab, tabs, text, textarea, time, toggle, treeSelect } from 'ngx-fluent-form';
import { map, switchMap, timer } from 'rxjs';
import { AUTOCOMPLETE_OPTIONS, AUTOCOMPLETE_STRINGS, CASCADER_OPTIONS, CHECKBOX_OPTIONS, RADIO_OPTIONS, SELECT_OPTIONS, TREE_SELECT_OPTIONS } from './options';

@Component({
  standalone: true,
  imports: [FluentFormComponent, NzGridModule, JsonPipe],
  templateUrl: './overview.component.html'
})
export class OverviewExampleComponent {
  schema = form(() => {
    if (Math.random() > 0.5) {
      heading5().content('基本示例');
    }
    headless('headless');
    input('text')
      .label('文本输入框')
      .tooltip('小贴士')
      .col(8)
      .id('ipt')
      .disabled('false')
      .autocomplete({
        options: AUTOCOMPLETE_STRINGS
      });
    number('number').label('数字输入框').col(8).disabled(ctx => {
      console.log(ctx);
      return false;
    });
    inputGroup().label('姓与名称').col(8).schemas(() => {
      input('first').placeholder('姓').col(8).autocomplete({
        options: AUTOCOMPLETE_OPTIONS
      });
      input('last').placeholder('名').col(16);
    });
    textarea('textarea').label('文本框').col(24).autocomplete({
      options: AUTOCOMPLETE_OPTIONS
    });
    date('date').label('日期录入框').col(6).class('custom-class');
    dateRange('date-range').label('区间日期录入框').col(6);
    datetime('datetime').label('日期时间录入框').col(6);
    time('time').label('时间录入框').col(6);
    toggle('toggle').label('开关').placeholder(['启用', '禁用']).defaultValue(true).col(6);
    radioGroup('radio-group').label('单选框组').options(RADIO_OPTIONS).col(6);
    checkbox('checkbox').label('单个复选框').content('同意').col(6);
    checkboxGroup('checkboxGroup').label('复选框组').options(CHECKBOX_OPTIONS).col(6);
    select('select').label('选择器').options(SELECT_OPTIONS).col(6);
    select('asyncSelect').label('动态数据选择器').col(6).fetchOptions(
      $ => $.pipe(
        switchMap(str =>
          timer(1000).pipe(
            map(() => [
              { label: 'a ' + str, value: 'a ' + str },
              { label: 'b ' + str, value: 'b ' + str },
              { label: 'c ' + str, value: 'c ' + str },
            ])
          )
        )
      )
    );
    cascader('cascader').label('联级选择器').options(CASCADER_OPTIONS).col(6);
    treeSelect('treeSelect').label('树形选择器').options(TREE_SELECT_OPTIONS).expandedKeys(['100', '1001']).col(6);
    rate('rate').label('评分').defaultValue(2.5).col(12);
    slider('slider').label('滑动条').defaultValue(30).col(12);
    text().content('文本');
    button().type('primary').content('普通按钮');
    button().type('primary').content('带图标的按钮').icon('check');
    button().content('危险按钮').variants({ danger: true });
    button().type('link').content('链接按钮');
    buttonGroup().schemas(() => {
      button().type('primary').content('确认');
      button().content('取消');
      button().content('看不见我').hidden(() => true);
      button().content('动态').hidden(({ model }) => model.slider < 50);
    });
    alert().message('Alert info text').icon(true).variants({ banner: true });
    steps().col(24).active(0).schemas(() => {
      step().title('第一步').schemas(() => {
        input('text1InStep1').label('文本输入框').placeholder('第一步的输入框').col(12);
        input('text2InStep1').label('文本输入框').placeholder('第一步的输入框').col(12);
      });
      step().title('第二步').schemas(() => {
        input('textInStep2').label('文本输入框').placeholder('第二步的输入框');
      });
      step().title('第三步').schemas(() => {
        input('textInStep3').label('文本输入框').placeholder('第三步的输入框');
      });
    });
    tabs().col(24).schemas(() => {
      tab().title('账号').schemas(() => {
        input('textInTab1').label('账号').col(12);
      });
      tab().title('手机号').schemas(() => {
        input('textInTab2').label('手机号');
      });
      tab().title('禁用').disabled(true).schemas(() => {
        input('textInTab3');
      });
    });
    row().col(24).justify('space-between').schemas(() => {
      date('dateInRow').label('居左').col(8);
      dateRange('dateRangeInRow').label('居右').col(8);
    });
    space().col(24).schemas(() => {
      button().content('你好');
      button().content('世界');
    });
  });

  model = {};
}
