import { button, form, input, inputGroup, number } from 'ngx-fluent-form';
import { defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

export const story = defineStory({
  args: {
    schemas: form(
      inputGroup().label('姓与名称').col(8).schemas(
        input('firstName').placeholder('姓').col(8),
        input('lastName').placeholder('名').col(16),
      ),
      inputGroup().label('个人信息').col(8).schemas(
        input('name').placeholder('姓名').col(15),
        number('age').placeholder('年龄').min(1).max(100).col(9),
      ),
      inputGroup().col(10).schemas(
        input('keyword').subtype('search').placeholder('请输入搜索关键字').col(18),
        button().subtype('primary').content('提交').col({ flex: 'auto' }),
      ),
      inputGroup().col(6).before('@').schemas(
        input('at').placeholder('请输入'),
      ),
      inputGroup().col(8).suffix({ icon: 'info-circle' }).schemas(
        input('info').placeholder('图标后缀'),
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
      inputGroup().label('姓与名称').col(8).schemas(
        input('first').placeholder('姓').col(8),
        input('last').placeholder('名').col(16),
      ),
      inputGroup().label('个人信息').col(8).schemas(
        input('name').placeholder('姓名').col(15),
        number('age').placeholder('年龄').min(1).max(100).col(9),
      ),
      inputGroup().col(10).schemas(
        input('keyword').subtype('search').placeholder('请输入搜索关键字').col(18),
        button().subtype('primary').content('提交').col({ flex: 'auto' }),
      ),
      inputGroup().col(6).before('@').schemas(
        input('at').placeholder('请输入'),
      ),
      inputGroup().col(8).suffix({ icon: 'info-circle' }).schemas(
        input('info').placeholder('图标后缀'),
      )
    );

    model = {};
  }
`;