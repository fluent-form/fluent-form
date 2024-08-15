import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { rate } from '@fluent-form/ui-zorro';

@Component({
  selector: 'rate-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class RateExampleComponent {
  schema = form(() => {
    rate('rate').label('Please rate').defaultValue(2.5);
  });

  model = {};
}