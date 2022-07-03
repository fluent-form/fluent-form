import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { array, cascader, checkbox, date, datetime, FluentFormModule, form, group, input, inputGroup, number, radio, range, rate, select, slider, switcher, textarea, time } from '../projects/ngx-fluent-form/src/public-api';
import { FluentFormWrapperComponent } from './fluent-form-wrapper.component';
import { CASCADER_OPTIONS, CHECKBOX_OPTIONS, RADIO_OPTIONS, SELECT_OPTIONS } from './options';

registerLocaleData(zh);

export default {
  title: 'FluentForm',
  component: FluentFormWrapperComponent,
  decorators: [
    moduleMetadata({
      imports: [
        FluentFormModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: NZ_I18N, useValue: zh_CN }],
    }),
  ],
  argTypes: {
    model: {
      control: 'object'
    },
    layout: {
      control: 'radio',
      options: ['vertical', 'horizontal', 'inline'],
    },
    spinSize: {
      control: 'radio',
      options: ['large', 'default', 'small'],
    },
  },
} as Meta;

const Template: Story<FluentFormWrapperComponent> = args => ({
  props: args,
});

export const Basic = Template.bind({});

Basic.args = {
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
};

export const GridLayout = Template.bind({});

GridLayout.args = {
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
};

export const InputGroup = Template.bind({});

InputGroup.args = {
  schemas: form(
    inputGroup().label('姓与名称').span(6).schemas(
      input('first').placeholder('姓').span(8),
      input('last').placeholder('名').span(16),
    ),
    inputGroup().label('个人信息').span(6).schemas(
      input('name').placeholder('姓名').span(15),
      number('age').placeholder('年龄').min(1).max(100).span(9),
    )
  ),
  model: {}
};

export const NestedFormGroup = Template.bind({});

NestedFormGroup.args = {
  schemas: form(
    input('name').label('用户名').required(true).span(24),
    input('age').label('年龄').required(true).span(24),
    group('info').label('其他信息').span(24).schemas(
      input('cellphone').subtype('tel').label('手机号').span(12),
      input('email').subtype('email').label('邮箱').span(12),
    )
  ),
  model: {}
};

export const NestedFormArray = Template.bind({});

const GENDER_OPTIONS = [{ label: '女', value: '女' }, { label: '男', value: '男' }];

NestedFormArray.args = {
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
};
