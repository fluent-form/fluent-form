import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { text } from '@fluent-form/ui-zorro';

@Component({
  selector: 'default-value-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class DefaultValueExampleComponent {
  schema = form(() => {
    text('text').defaultValue('默认值');
  });

  model = {};
}
