import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent } from '@fluent-form/core';
import { form, timePicker } from '@fluent-form/ui-zorro';

@Component({
  selector: 'time-picker-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class TimePickerExampleComponent {
  readonly schema = form(() => {
    timePicker('time').placeholder('Please select time').col(4);
  });

  readonly model = signal({});
}
