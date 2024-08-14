import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { toggle } from '@fluent-form/ui-zorro';

@Component({
  selector: 'toggle-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class ToggleExampleComponent {
  schema = form(() => {
    toggle('toggle').defaultValue(true);
    toggle('switch').placeholder(['off', 'on']);
  });

  model = {};
}
