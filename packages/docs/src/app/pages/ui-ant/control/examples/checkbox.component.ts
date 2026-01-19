import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { checkbox } from '@fluent-form/ui-zorro';

@Component({
  selector: 'checkbox-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class CheckboxExampleComponent {
  readonly schema = form(() => {
    checkbox('accept')
      .content('I agree and accept the terms of service.')
      .defaultValue(true);
  });

  readonly model = signal({});
}
