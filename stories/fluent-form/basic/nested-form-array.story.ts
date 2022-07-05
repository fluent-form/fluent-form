import { array, datetime, FluentFormComponent, form, group, input, radio } from 'ngx-fluent-form';
import { createStory } from 'stories/storybook.utils';

const GENDER_OPTIONS = [{ label: '女', value: '女' }, { label: '男', value: '男' }];

export const NestedFormArray = createStory<FluentFormComponent<{}>>({
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