import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { radioGroup } from '@fluent-form/ui-zorro';

@Component({
  selector: 'radio-group-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class RadioGroupExampleComponent {
  schema = form(() => {
    radioGroup('gender').label('Gender').defaultValue(1).options([
      { label: 'Wonmen', value: 0 },
      { label: 'Men', value: 1 }
    ]);
  });

  model = {};
}
