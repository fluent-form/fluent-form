import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { datePicker } from '@fluent-form/ui-zorro';

@Component({
  selector: 'date-picker-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class DatePickerExampleComponent {
  schema = form(() => {
    datePicker('date')
      .label('Date')
      .placeholder('Please select date')
      .col(4);
    datePicker('datetime')
      .label('Datetime')
      .placeholder('Please select datetime')
      .time(true).col(4);
  });

  model = {};
}
