import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FluentFormLayoutModule, FluentGridModule, date, form, group, input, inputGroup, slider, toggle } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormLayoutModule, FluentGridModule, NzTableModule, JsonPipe],
  templateUrl: './custom-layout.component.html'
})
export class CustomLayoutExampleComponent {
  schema = form(() => {
    inputGroup('name').schemas(() => {
      input('firstName').col(6);
      input('lastName').col(6);
    });
    slider('age').style({ width: '120px' });
    group('info').schemas(() => {
      date('birthday');
    });
    toggle('enabled');
  });

  list = [
    {
      firstName: 'John',
      lastName: 'Brown',
      age: 32,
      enabled: true
    },
    {
      firstName: 'Jim',
      lastName: 'Green',
      age: 42,
      enabled: true
    },
    {
      firstName: 'Joe',
      lastName: 'Black',
      age: 32,
      enabled: false
    }
  ];
}
