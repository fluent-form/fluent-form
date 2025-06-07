import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { select, textField } from '@fluent-form/ui-zorro';

@Component({
  selector: 'linkage-by-value-changes-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class LinkageByValueChangesExampleComponent {
  readonly schema = form(() => {
    select('content')
      .label('Change value')
      .options([
        { label: 'Jack', value: 'jack' },
        { label: 'Lucy', value: 'lucy' }
      ])
      .listeners({
        valueChange: (value, { control }) => {
          control.parent?.get('target')?.setValue(value);
        }
      })
      .col(3);

    textField('target').label('Target control').col(3);
  });

  readonly model = signal({});
}
