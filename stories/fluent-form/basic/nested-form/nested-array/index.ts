import { array, datetime, form, group, input, radio } from 'ngx-fluent-form';
import { defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

const GENDER_OPTIONS = [{ label: '女', value: '女' }, { label: '男', value: '男' }];

export const story = defineStory({
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

export const source = dedent`
  import { Component } from '@angular/core';
  import { array, datetime, form, group, input, radio } from 'ngx-fluent-form';

  const GENDER_OPTIONS = [{ label: '女', value: '女' }, { label: '男', value: '男' }];

  @Component({
    selector: 'example-component',
    template: \`<fluent-form [schemas]="schemas" [(model)]="model"></fluent-form>\`
  })
  export class ExampleComponent {
    schemas = form(
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
    );

    model = {};
  }
`;