import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { time } from '@fluent-form/ui-zorro';

@Component({
  selector: 'time-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class TimeExampleComponent {
  schema = form(() => {
    time('time').placeholder('Please select time').col(4);
  });

  model = {};
}
