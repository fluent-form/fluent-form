import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent } from '@fluent-form/core';
import { form, textField } from '@fluent-form/ui-zorro';

@Component({
  selector: 'default-value-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class DefaultValueExampleComponent {
  readonly schema = form(() => {
    textField('text').defaultValue('Default value');
  });

  readonly model = signal({});
}
