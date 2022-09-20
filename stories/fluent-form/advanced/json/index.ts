import { defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

export const story = defineStory({
  args: {
    schemas: [
      { type: 'input', name: 'username', label: '用户名', placeholder: '请输入用户名' },
      {
        type: 'input',
        name: 'password',
        label: '密码',
        placeholder: '请输入密码',
        subtype: 'password',
        disabled: '!model.username'
      },
    ],
    model: {}
  },
});

export const jsonSource = dedent`
  import { Component } from '@angular/core';
  import { AnySchema } from 'ngx-fluent-form';

  @Component({
    selector: 'example-component',
    template: \`<fluent-form [schemas]="schemas" [(model)]="model"></fluent-form>\`
  })
  export class ExampleComponent {
    schemas: AnySchema[] = [
      { type: 'input', name: 'username', label: '用户名', placeholder: '请输入用户名' },
      {
        type: 'input',
        name: 'password',
        label: '密码',
        placeholder: '请输入密码',
        subtype: 'password',
        disabled: '!model.username'
      }
    ];

    model = {};
  }
`;

export const jsonAndFluentSource = dedent`
  import { Component } from '@angular/core';
  import { AnySchema, input } from 'ngx-fluent-form';

  @Component({...})
  export class ExampleComponent {
    schemas: AnySchema[] = [
      input('username').label('用户名').placeholder('请输入用户名').build(), // 👈 call build() method
      {
        type: 'input',
        name: 'password',
        label: '密码',
        placeholder: '请输入密码',
        subtype: 'password',
        disabled: '!model.username'
      }
    ];

    model = {};
  }
`;

export const fluentAndJsonSource = dedent`
  import { Component } from '@angular/core';
  import { form, input } from 'ngx-fluent-form';

  @Component({...})
  export class ExampleComponent {
    schemas = form(
      { type: 'input', name: 'username', label: '用户名', placeholder: '请输入用户名' },
      input('password').label('密码').placeholder('请输入密码').subtype('password').disabled(({ model }) => !model.username),
    );

    model = {};
  }
`;

export const expressionSource = dedent`
  {
    type: 'input',
    name: 'password',
    label: '密码',
    disabled: '!model.username'
  }
`;
