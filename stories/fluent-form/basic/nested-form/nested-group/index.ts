import { form, group, input } from 'ngx-fluent-form';
import { defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

export const story = defineStory({
  args: {
    schemas: form(
      input('name').label('用户名').required(true).col(24),
      input('age').label('年龄').required(true).col(24),
      group('info').label('其他信息').col(24).schemas(
        input('cellphone').type('tel').label('手机号').col(12),
        input('email').type('email').label('邮箱').col(12),
      )
    ),
    model: {}
  }
});

export const source = dedent`
  import { Component } from '@angular/core';
  import { form, group, input } from 'ngx-fluent-form';

  @Component({
    selector: 'example-component',
    template: \`<fluent-form [schemas]="schemas" [(model)]="model"></fluent-form>\`
  })
  export class ExampleComponent {
    schemas = form(
      input('name').label('用户名').required(true).col(24),
      input('age').label('年龄').required(true).col(24),
      group('info').label('其他信息').col(24).schemas(
        input('cellphone').type('tel').label('手机号').col(12),
        input('email').type('email').label('邮箱').col(12),
      )
    );

    model = {};
  }
`;