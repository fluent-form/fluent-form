import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { dateRange } from '@fluent-form/ui-zorro';

@Component({
  selector: 'multi-key-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class MultiKeyExampleComponent {
  schema = form(() => {
    dateRange(['start', 'end']).label('日期区间');
  });

  model = {};
}
