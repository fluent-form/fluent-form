import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { checkbox } from '@fluent-form/ui-zorro';

@Component({
  selector: 'checkbox-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class CheckboxExampleComponent {
  schema = form(() => {
    checkbox('accept')
      .content('I agree and accept the terms of service.')
      .defaultValue(true);
  });

  model = {};
}
