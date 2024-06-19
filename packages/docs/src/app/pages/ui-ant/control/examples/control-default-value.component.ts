import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { input } from '@fluent-form/ui-zorro';

@Component({
  selector: 'control-default-value-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class ControlDefaultValueExampleComponent {
  schema = form(() => {
    input('text').defaultValue('默认值');
  });

  model = {};
}
