import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { applyGroup, passwordField, textField } from '@fluent-form/ui-zorro';

@Component({
  selector: 'root-form-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class RootFormExampleComponent {
  schema = form(() => {
    applyGroup({ updateOn: 'blur' });
    textField('username').label('Username');
    passwordField('password').label('Password');
  });

  model = {};
}
