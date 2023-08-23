import { form } from 'ngx-fluent-form';
import { defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

export const story = defineStory({
  args: {
    schema: form([
      { kind: 'input', key: 'username', label: '用户名', placeholder: '请输入用户名' },
      {
        kind: 'input',
        key: 'password',
        label: '密码',
        placeholder: '请输入密码',
        type: 'password',
        disabled: '!model.username'
      },
    ]),
    model: {}
  },
});

export const jsonSource = dedent`
  import { Component } from '@angular/core';
  import { AnySchema } from 'ngx-fluent-form';

  @Component({
    selector: 'example-component',
    template: \`<fluent-form [(model)]="model" [schema]="schema"></fluent-form>\`
  })
  export class ExampleComponent {
    schema = form([
      { kind: 'input', key: 'username', label: '用户名', placeholder: '请输入用户名' },
      {
        kind: 'input',
        key: 'password',
        label: '密码',
        placeholder: '请输入密码',
        type: 'password',
        disabled: '!model.username'
      },
    ]);

    model = {};
  }
`;

export const expressionSource = dedent`
  {
    kind: 'input',
    key: 'password',
    label: '密码',
    disabled: '!model.username'
  }
`;
