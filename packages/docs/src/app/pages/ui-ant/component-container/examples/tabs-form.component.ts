import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { button, checkbox, passwordField, tab, tabs, textField } from '@fluent-form/ui-zorro';

@Component({
  selector: 'tabs-form-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class TabsFormExampleComponent {
  readonly schema = form(() => {
    tabs().col(12).schemas(() => {
      tab().title('用户名').schemas(() => {
        textField('username').label('用户名').col(12);
        passwordField('password').label('密码').col(12);
        checkbox('remember').content('记住我');
        button().type('primary').content('立即登录').variants({ block: true }).col(12);
      });

      tab().title('手机号').schemas(() => {
        textField('cellphone').type('tel').label('手机号').col(12);
        passwordField('password').label('密码').col(12);
        checkbox('remember').content('记住我');
        button().type('primary').content('立即登录').variants({ block: true }).col(12);
      });
    });
  });

  readonly model = signal({});
}
