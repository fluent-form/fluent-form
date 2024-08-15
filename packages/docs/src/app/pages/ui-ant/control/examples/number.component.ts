import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { number } from '@fluent-form/ui-zorro';

@Component({
  selector: 'number-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class NumberExampleComponent {
  schema = form(() => {
    number('num')
      .label('Number')
      .placeholder('Please enter number')
      .range({ min: 0, max: 99 })
      .col(4);
    number('int')
      .label('Integer')
      .placeholder('Please enter integer')
      .precision(0)
      .col(4);
  });

  model = {};
}
