import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent } from '@fluent-form/core';
import { dateRangePicker, form } from '@fluent-form/ui-zorro';

@Component({
  selector: 'multi-key-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class MultiKeyExampleComponent {
  readonly schema = form(() => {
    dateRangePicker(['start', 'end']).label('Date Range');
  });

  readonly model = signal({});
}
