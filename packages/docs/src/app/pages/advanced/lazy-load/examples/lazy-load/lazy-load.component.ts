import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FluentFormModule } from '@fluent-form/core';
import {
  array,
  cascader,
  checkbox,
  checkboxGroup,
  datePicker,
  dateRangePicker,
  form,
  numberField,
  radioGroup,
  rate,
  segmented,
  select,
  slider,
  textArea,
  textField,
  timePicker,
  toggle,
  transfer,
  treeSelect
} from '@fluent-form/ui-zorro';

@Component({
  selector: 'lazy-load-example',
  imports: [FluentFormModule, JsonPipe, ReactiveFormsModule],
  templateUrl: './lazy-load.component.html'
})
export class LazyLoadExampleComponent {
  readonly schema = form(() => {
    textField('text');
    textArea('textarea').col(12);
    numberField('number').col(12);
    datePicker('date').col(12);
    dateRangePicker('dateRange').col(12);
    timePicker('time').col(12);
    toggle('toggle').col(12);
    select('select').options([]).col(12);
    cascader('cascader').options([{ label: 'A', value: 'a', children: [{ label: 'A1', value: 'a1' }] }]).col(12);
    slider('slider').col(12);
    treeSelect('treeSelect').options([]).col(12);
    radioGroup('radioGroup').options([]).col(12);
    checkbox('checkbox').col(12);
    checkboxGroup('checkboxGroup').options([]).col(12);
    rate('rate').col(12);
    transfer('transfer').options([]).col(12);
    segmented('segmented').options([]).col(12);
    array('array').col(12).schemas(() => {
      textField('txt').col(12);
    });
  });

  readonly model = signal({});
}
