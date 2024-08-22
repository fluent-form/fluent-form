import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { select, text } from '@fluent-form/ui-zorro';

@Component({
  selector: 'linkage-by-value-changes-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class LinkageByValueChangesExampleComponent {
  schema = form(() => {
    select('content')
      .label('Change value')
      .options([
        { label: 'Jack', value: 'jack' },
        { label: 'Lucy', value: 'lucy' },
      ])
      .listeners({
        valueChange: (value, { control }) => {
          control.parent?.get('target')?.setValue(value);
        }
      })
      .col(3);

    text('target').label('Target control').col(3);
  });

  model = {};
}
