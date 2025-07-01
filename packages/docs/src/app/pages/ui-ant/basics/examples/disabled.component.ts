import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent } from '@fluent-form/core';
import { form, textField } from '@fluent-form/ui-zorro';

@Component({
  selector: 'disabled-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class DisabledExampleComponent {
  readonly schema = form(() => {
    textField('text-1').disabled(true);
    textField('text-2').disabled(() => true);

    textField('text-3').disabled(true).hidden(true);
    textField('text-4').disabled(true).hidden(({ control }) => control.disabled);
  });

  readonly model = signal({});
}
