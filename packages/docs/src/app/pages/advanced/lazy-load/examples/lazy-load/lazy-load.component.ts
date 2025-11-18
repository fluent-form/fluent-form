import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FluentFormModule } from '@fluent-form/core';
import {
  array,
  datePicker,
  dateRangePicker,
  form,
  group,
  numberField,
  slider,
  textArea,
  textField,
  timePicker,
  toggle
} from '@fluent-form/ui-zorro';

@Component({
  selector: 'lazy-load-example',
  imports: [FluentFormModule, JsonPipe, ReactiveFormsModule],
  templateUrl: './lazy-load.component.html'
})
export class LazyLoadExampleComponent {
  readonly schema = form(() => {
    array('array').col(12).schemas(() => {
      textField('text').col(12);
      textArea('textarea').col(12);
      numberField('number').col(12);
      group('group').col(12).schemas(() => {
        datePicker('date').col(12);
        dateRangePicker('dateRange').col(12);
        timePicker('time').col(12);
      });
      toggle('toggle').col(12);
      slider('slider').col(12);
    });
  });

  readonly model = signal({});
}
