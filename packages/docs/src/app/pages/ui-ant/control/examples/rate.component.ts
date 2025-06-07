import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { rate } from '@fluent-form/ui-zorro';

@Component({
  selector: 'rate-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class RateExampleComponent {
  readonly schema = form(() => {
    rate('rate').label('Please rate').defaultValue(2.5);
  });

  readonly model = signal({});
}
