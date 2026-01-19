import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { button, group, numberField, textField } from '@fluent-form/ui-zorro';

@Component({
  selector: 'form-group-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class FormGroupExampleComponent {
  readonly schema = form(() => {
    textField('name').label('Name').col(12);
    numberField('age').label('Age').col(12);

    group('info').label('Info').col(12).schemas(() => {
      textField('cellphone').type('tel').label('Cellphone').col(6);
      textField('email').type('email').label('Email').col(6);
    });

    button().content('Submit').type('primary').variants({ block: true });
  });

  readonly model = signal({});
}
