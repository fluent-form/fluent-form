import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { textField } from '@fluent-form/ui-zorro';

@Component({
  selector: 'path-key-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class PathKeyExampleComponent {
  readonly schema = form(() => {
    textField('user.name').label('Username');
    textField('user.password').label('Password').type('password');
  });

  readonly model = signal({
    user: {
      name: '海森堡'
    }
  });
}
