import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { select } from '@fluent-form/ui-zorro';

@Component({
  selector: 'select-custom-property-names-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class SelectCustomPropertyNamesExampleComponent {
  http = inject(HttpClient);

  schema = form(() => {
    select('user')
      .placeholder('Please select user')
      .options([
        { name: 'Jack', code: 'jack' },
        { name: 'lucy', code: 'lucy' },
        { name: 'Mike', code: 'mike' },
      ])
      .config({ labelProperty: 'name', valueProperty: 'code' })
      .col(4);
  });

  model = {};
}
