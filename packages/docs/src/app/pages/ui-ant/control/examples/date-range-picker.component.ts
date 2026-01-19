import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { dateRangePicker } from '@fluent-form/ui-zorro';

@Component({
  selector: 'date-range-picker-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class DateRangePickerExampleComponent {
  readonly schema = form(() => {
    dateRangePicker('dateRange')
      .label('Date range')
      .placeholder(['Start date', 'End date'])
      .col(4);

    dateRangePicker('datetimeRange')
      .label('Datetime range')
      .placeholder(['Start time', 'End time'])
      .time(true)
      .col(4);

    dateRangePicker(['startDate', 'endDate'])
      .label('Multi keys')
      .placeholder(['Start date', 'End date'])
      .col(4);
  });

  readonly model = signal({});
}
