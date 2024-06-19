import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { dateRange } from '@fluent-form/ui-zorro';

@Component({
  selector: 'control-multi-key-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class ControlMultiKeyExampleComponent {
  schema = form(() => {
    dateRange(['start', 'end']).label('日期区间');
  });

  model = {};
}
