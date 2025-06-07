import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { segmented } from '@fluent-form/ui-zorro';

@Component({
  selector: 'segmented-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class SegmentedExampleComponent {
  readonly schema = form(() => {
    segmented('tab').label('Place select').defaultValue('Weekly').options([
      { label: 'Daily', value: 'Daily' },
      { label: 'Weekly', value: 'Weekly' },
      { label: 'Monthly', value: 'Monthly' },
      { label: 'Quarterly', value: 'Quarterly' },
      { label: 'Yearly', value: 'Yearly' }
    ]);
  });

  readonly model = signal({});
}
