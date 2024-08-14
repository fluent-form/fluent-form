import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { text } from '@fluent-form/ui-zorro';

@Component({
  selector: 'disabled-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class DisabledExampleComponent {
  schema = form(() => {
    text('text-1').disabled(true);
    text('text-2').disabled(() => true);

    text('text-3').disabled(true).hidden(true);
    text('text-4').disabled(true).hidden(({ control }) => control.disabled);
  });

  model = {};
}
