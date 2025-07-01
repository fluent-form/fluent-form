import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent } from '@fluent-form/core';
import { datePicker, form } from '@fluent-form/ui-zorro';

@Component({
  selector: 'date-picker-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class DatePickerExampleComponent {
  readonly schema = form(() => {
    datePicker('date')
      .label('Date')
      .placeholder('Please select date')
      .col(4);
    datePicker('datetime')
      .label('Datetime')
      .placeholder('Please select datetime')
      .time(true).col(4);
  });

  readonly model = signal({});
}
