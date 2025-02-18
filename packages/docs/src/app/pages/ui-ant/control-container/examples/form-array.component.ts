import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { array, button, datetimePicker, text } from '@fluent-form/ui-zorro';

@Component({
  selector: 'form-array-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form class="block mr-12" [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class FormArrayExampleComponent {
  schema = form(() => {
    text('flight').label('航班').col(12);
    datetimePicker('boardingTime').label('登机时间').col(12);

    array('passengers')
      .label('乘客')
      .length({ min: 1, max: 5 })
      .orderable(true)
      .col(12)
      .schemas(() => {
        text().placeholder('请输入姓名').col(12);
      });

    button()
      .type('primary')
      .content('提交')
      .variants({ block: true })
      .disabled(ctx => ctx.control.invalid)
      .col(12);
  });

  model = {};
}
