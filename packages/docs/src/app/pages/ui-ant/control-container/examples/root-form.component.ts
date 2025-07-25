import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent } from '@fluent-form/core';
import { form, passwordField, textField } from '@fluent-form/ui-zorro';

@Component({
  selector: 'root-form-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class RootFormExampleComponent {
  readonly schema = form(it => {
    it.updateOn('blur');
    textField('username').label('Username');
    passwordField('password').label('Password');
  });

  readonly model = signal({});
}
