import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { input } from '@fluent-form/ui-zorro';

@Component({
  selector: 'control-disabled-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class ControlDisabledExampleComponent {
  schema = form(() => {
    input('text-1').disabled(true);
    input('text-2').disabled(() => true);

    input('text-3').disabled(true).hidden(true);
    input('text-4').disabled(true).hidden(({ control }) => control.disabled);
  });

  model = {};
}
