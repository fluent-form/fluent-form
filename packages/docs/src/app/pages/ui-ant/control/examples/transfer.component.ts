import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { transfer } from '@fluent-form/ui-zorro';

@Component({
  selector: 'transfer-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class TransferExampleComponent {
  readonly schema = form(() => {
    transfer('toggle').label('Please transfer').defaultValue(['Apple']).options([
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' }
    ]);
  });

  readonly model = signal({});
}
