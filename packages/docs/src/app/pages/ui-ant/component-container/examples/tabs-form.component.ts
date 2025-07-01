import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent } from '@fluent-form/core';
import { button, checkbox, form, passwordField, tab, tabs, textField } from '@fluent-form/ui-zorro';

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
      tab().title('Username').schemas(() => {
        textField('username').label('Username').col(12);
        passwordField('password').label('Password').col(12);
      });

      tab().title('Cellphone').schemas(() => {
        textField('cellphone').type('tel').label('Cellphone').col(12);
        textField('captcha').label('Captcha').col(12);
      });
    });
    checkbox('remember').content('Remember me');
    button().type('primary').content('Login').variants({ block: true }).col(12);
  });

  readonly model = signal({});
}
