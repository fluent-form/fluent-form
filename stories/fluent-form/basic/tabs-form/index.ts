import { button, checkbox, form, input, tab, tabs } from 'ngx-fluent-form';
import { defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

export const story = defineStory({
  args: {
    schema: form(() => {
      tabs().col(24).schemas(() => {
        tab().title('用户名').schemas(() => {
          input('username').label('用户名').col(24);
          input('password').type('password').label('密码').col(24);
          checkbox('remember').content('记住我');
        });
        tab().title('手机号').schemas(() => {
          input('cellphone').type('tel').label('手机号').col(24);
          input('password').type('password').label('密码').col(24);
          checkbox('remember').content('记住我');
        });
      });
      button().type('primary').mode('submit').content('立即登录').variants({ block: true }).col(24);
    }),
    model: {}
  }
});

export const source = dedent`
  import { Component } from '@angular/core';
  import { button, checkbox, form, input, tab, tabs } from 'ngx-fluent-form';

  @Component({
    selector: 'example-component',
    template: \`<fluent-form [(model)]="model" [schema]="schema"></fluent-form>\`
  })
  export class ExampleComponent {
    schema = form(() => {
      tabs().col(24).schemas(() => {
        tab().title('用户名').schemas(() => {
          input('username').label('用户名').col(24);
          input('password').type('password').label('密码').col(24);
          checkbox('remember').content('记住我');
        });
        tab().title('手机号').schemas(() => {
          input('cellphone').type('tel').label('手机号').col(24);
          input('password').type('password').label('密码').col(24);
          checkbox('remember').content('记住我');
        });
      });
      button().type('primary').mode('submit').content('立即登录').variants({ block: true }).col(24);
    });

    model = {};
  }
`;
