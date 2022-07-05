import { FluentFormComponent, form, group, input } from 'ngx-fluent-form';
import { createStory } from 'stories/storybook.utils';

export const NestedFormGroup = createStory<FluentFormComponent<{}>>({
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