import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { select } from '@fluent-form/ui-zorro';

@Component({
  selector: 'select-remote-data-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class SelectExampleComponent {
  http = inject(HttpClient);

  readonly schema = form(() => {
    select('user')
      .placeholder('Please select user')
      .options([
        { label: 'Jack', value: 'jack' },
        { label: 'lucy', value: 'lucy' },
        { label: 'Mike', value: 'mike' }
      ])
      .col(4);

    select('users')
      .mode('multiple')
      .placeholder('Please select users')
      .options([
        { label: 'Jack', value: 'jack' },
        { label: 'lucy', value: 'lucy' },
        { label: 'Mike', value: 'mike' }
      ])
      .col(4);
  });

  readonly model = signal({});
}
