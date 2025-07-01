import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent } from '@fluent-form/core';
import { checkboxGroup, form } from '@fluent-form/ui-zorro';

@Component({
  selector: 'checkbox-group-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class CheckboxGroupExampleComponent {
  readonly schema = form(() => {
    checkboxGroup('fruits').label('Please check').options([
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' }
    ]);
  });

  readonly model = signal({});
}
