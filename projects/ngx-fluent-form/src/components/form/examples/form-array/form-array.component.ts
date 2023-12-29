import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { array, button, datetime, FluentFormComponent, form, input } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormComponent, NzGridModule, JsonPipe],
  templateUrl: './form-array.component.html'
})
export class FormArrayExampleComponent {
  schema = form(() => {
    input('flight').label('航班').col(11);
    datetime('boardingTime').label('登机时间').col(11);

    array('passengers')
      .label('乘客')
      .length({ min: 1, max: 5 })
      .orderable(true)
      .col(22)
      .schemas(() => {
        input().placeholder('请输入姓名').col(24);
      });

    button().content('提交').type('primary').col(22).variants({ block: true });
  });

  model = {
    passengers: ['特朗普']
  };
}
