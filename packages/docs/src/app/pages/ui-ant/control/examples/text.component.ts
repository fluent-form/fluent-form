import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { text } from '@fluent-form/ui-zorro';

@Component({
  selector: 'text-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class TextExampleComponent {
  schema = form(() => {
    text('name').label('Text').placeholder('Please enter').col(4);
    text('email').type('email').label('Email').placeholder('Please enter').col(4);
    text('pwd').type('password').label('Password').placeholder('Please enter').col(4);
  });

  model = {};
}
