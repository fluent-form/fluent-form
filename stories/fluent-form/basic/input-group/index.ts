import { button, form, input, inputGroup, number } from 'ngx-fluent-form';
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
      ),
      inputGroup().span(10).schemas(
        input('keyword').subtype('search').placeholder('请输入搜索关键字').span(18),
        button().subtype('primary').content('提交').flex('auto'),
      ),
      inputGroup().span(6).before({ template: '@' }).schemas(
        input('at').placeholder('请输入'),
      )
    ),
    model: {}
  }
});

export const source = dedent`
  import { Component } from '@angular/core';
  import { button, form, input, inputGroup, number } from 'ngx-fluent-form';

  @Component({
    selector: 'example-component',
    template: \`<fluent-form [schemas]="schemas" [(model)]="model"></fluent-form>\`
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
      ),
      inputGroup().span(10).schemas(
        input('keyword').subtype('search').placeholder('请输入搜索关键字').span(18),
        button().subtype('primary').content('提交').flex('auto'),
      ),
      inputGroup().span(8).before({ template: '@' }).schemas(
        input('at').placeholder('请输入搜索'),
      )
    );

    model = {};
  }
`;