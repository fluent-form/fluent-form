import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { checkboxGroup } from '@fluent-form/ui-zorro';

@Component({
  selector: 'checkbox-group-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class CheckboxGroupExampleComponent {
  schema = form(() => {
    checkboxGroup('fruits').label('Please check').options([
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' }
    ]);
  });

  model = {};
}
