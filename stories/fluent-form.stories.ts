import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component } from '@angular/core';
import { array, cascader, checkbox, date, datetime, form, group, input, inputGroup, number, radio, range, rate, select, slider, switcher, textarea, time } from 'ngx-fluent-form';
import { AbstractFluentFormWrapperComponent } from './components/abstract-fluent-form-wrapper.component';
import { CASCADER_OPTIONS, CHECKBOX_OPTIONS, RADIO_OPTIONS, SELECT_OPTIONS } from './control.options';
import { createMeta, createStory } from './storybook.utils';

registerLocaleData(zh);

@Component({
  selector: 'fluent-form-warpper',
  template: `
    <fluent-form
      [schemas]="schemas"
      [model]="model"
      [layout]="layout"
      [colon]="colon"
      [spinning]="spinning"
      [spinTip]="spinTip"
      [spinSize]="spinSize"></fluent-form>
    <pre>{{ model | json }}</pre>
  `,
  styleUrls: ['./components/abstract-fluent-form-wrapper.component.scss']
})
class FluentFormWrapperComponent extends AbstractFluentFormWrapperComponent { }

export default createMeta({
  title: 'FluentForm/Basic',
  component: FluentFormWrapperComponent,
});

export const BasicExample = createStory<FluentFormWrapperComponent>({
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

export const GridLayout = createStory<FluentFormWrapperComponent>({
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

export const InputGroup = createStory<FluentFormWrapperComponent>({
  args: {
    schemas: form(
      inputGroup().label('姓与名称').span(7).schemas(
        input('first').placeholder('姓').span(8),
        input('last').placeholder('名').span(16),
      ),
      inputGroup().label('个人信息').span(7).schemas(
        input('name').placeholder('姓名').span(15),
        number('age').placeholder('年龄').min(1).max(100).span(9),
      )
    ),
    model: {}
  }
});

export const NestedFormGroup = createStory<FluentFormWrapperComponent>({
  args: {
    schemas: form(
      input('name').label('用户名').required(true).span(24),
      input('age').label('年龄').required(true).span(24),
      group('info').label('其他信息').span(24).schemas(
        input('cellphone').subtype('tel').label('手机号').span(12),
        input('email').subtype('email').label('邮箱').span(12),
      )
    ),
    model: {}
  }
});

const GENDER_OPTIONS = [{ label: '女', value: '女' }, { label: '男', value: '男' }];

export const NestedFormArray = createStory<FluentFormWrapperComponent>({
  args: {
    schemas: form(
      input('flight').label('航班').required(true).span(12),
      datetime('boardingTime').label('登机时间').required(true).span(12),
      array('passengers').label('机组乘客').span(24).schemas(
        group().span(12).schemas(
          input('name').label('姓名').value('史蒂夫'),
          radio('gender').label('性别').options(GENDER_OPTIONS).value('男'),
        ),
        group().span(12).schemas(
          input('name').label('姓名').value('卡拉'),
          radio('gender').label('性别').options(GENDER_OPTIONS).value('女'),
        ),
        group().span(12).schemas(
          input('name').label('姓名'),
          radio('gender').label('性别').options(GENDER_OPTIONS),
        )
      )
    ),
    model: {}
  }
});
