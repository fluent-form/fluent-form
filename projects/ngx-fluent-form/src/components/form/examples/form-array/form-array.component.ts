import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { array, button, datetime, FluentFormComponent, FluentGridModule, form, input } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormComponent, FluentGridModule, JsonPipe],
  templateUrl: './form-array.component.html'
})
export class FormArrayExampleComponent {
  schema = form(() => {
    input('flight').label('航班').col(12);
    datetime('boardingTime').label('登机时间').col(12);

    array('passengers')
      .label('乘客')
      .length({ min: 1, max: 5 })
      .orderable(true)
      .col(12)
      .schemas(() => {
        input().placeholder('请输入姓名').col(12);
      });

    button().content('提交').type('primary').col(12).variants({ block: true });
  });

  model = {
    passengers: ['特朗普']
  };
}
