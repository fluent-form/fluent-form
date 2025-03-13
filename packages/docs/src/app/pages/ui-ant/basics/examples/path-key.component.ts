import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { textField } from '@fluent-form/ui-zorro';

@Component({
  selector: 'path-key-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class PathKeyExampleComponent {
  schema = form(() => {
    textField('user.name').label('用户名');
    textField('user.password').label('密码').type('password');
  });

  model = {
    user: {
      name: '海森堡'
    }
  };
}
