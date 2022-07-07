import { form, input, inputGroup, number } from 'ngx-fluent-form';
import { defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

export const story = defineStory({
  args: {
    schemas: form(
      inputGroup().label('姓与名称').span(8).schemas(
        input('first').placeholder('姓').span(8),
        input('last').placeholder('名').span(16),
      ),
      inputGroup().label('个人信息').span(8).schemas(
        input('name').placeholder('姓名').span(15),
        number('age').placeholder('年龄').min(1).max(100).span(9),
      )
    ),
    model: {}
  }
});

export const source = dedent`
  import { Component } from '@angular/core';
  import { form, input, inputGroup, number } from 'ngx-fluent-form';

  @Component({
    selector: 'example-component',
    template: \`<fluent-form [schemas]="schemas" [model]="model"></fluent-form>\`
  })
  export class ExampleComponent {
    schemas = form(
      inputGroup().label('姓与名称').span(8).schemas(
        input('first').placeholder('姓').span(8),
        input('last').placeholder('名').span(16),
      ),
      inputGroup().label('个人信息').span(8).schemas(
        input('name').placeholder('姓名').span(15),
        number('age').placeholder('年龄').min(1).max(100).span(9),
      )
    );

    model = {};
  }
`;