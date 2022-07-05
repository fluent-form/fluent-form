import { FluentFormComponent, form, input, inputGroup, number } from 'ngx-fluent-form';
import { createStory } from 'stories/storybook.utils';

export const InputGroup = createStory<FluentFormComponent<{}>>({
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