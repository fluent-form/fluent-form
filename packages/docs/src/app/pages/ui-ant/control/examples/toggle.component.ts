import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { toggle } from '@fluent-form/ui-zorro';

@Component({
  selector: 'toggle-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class ToggleExampleComponent {
  readonly schema = form(() => {
    toggle('toggle').defaultValue(true);
    toggle('switch').placeholder(['on', 'off']);
  });

  readonly model = signal({});
}
