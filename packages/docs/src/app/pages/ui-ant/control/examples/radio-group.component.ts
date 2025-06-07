import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { radioGroup } from '@fluent-form/ui-zorro';

@Component({
  selector: 'radio-group-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class RadioGroupExampleComponent {
  readonly schema = form(() => {
    radioGroup('gender').label('Gender').defaultValue(1).options([
      { label: 'Wonmen', value: 0 },
      { label: 'Men', value: 1 }
    ]);
    radioGroup('sex').label('Sex').variants({ button: 'solid' }).defaultValue(1).options([
      { label: 'Wonmen', value: 0 },
      { label: 'Men', value: 1 }
    ]);
  });

  readonly model = signal({});
}
