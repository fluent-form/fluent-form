import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent } from '@fluent-form/core';
import { array, button, datetimePicker, form, textField } from '@fluent-form/ui-zorro';

@Component({
  selector: 'form-array-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form class="block mr-12" [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class FormArrayExampleComponent {
  readonly schema = form(() => {
    textField('flight').label('Flight').col(12);
    datetimePicker('boardingTime').label('Boarding time').col(12);

    array('passengers')
      .label('Passengers')
      .length({ min: 1, max: 5 })
      .orderable(true)
      .col(12)
      .schemas(() => {
        textField().placeholder('Please enter').col(12);
      });

    button()
      .type('primary')
      .content('Submit')
      .variants({ block: true })
      .disabled(ctx => ctx.control.invalid)
      .col(12);
  });

  readonly model = signal({});
}
