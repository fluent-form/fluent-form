import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { checkboxGroup } from '@fluent-form/ui-zorro';

@Component({
  selector: 'checkbox-group-custom-property-names-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class CheckboxGroupCustomPropertyNamesExampleComponent {
  schema = form(() => {
    checkboxGroup('fruits')
      .label('Please check')
      .options([
        { id: 1, name: 'Apple' },
        { id: 2, name: 'Pear' },
        { id: 3, name: 'Orange' }
      ])
      .config({ labelProperty: 'name', valueProperty: 'id' });
  });

  model = {};
}
