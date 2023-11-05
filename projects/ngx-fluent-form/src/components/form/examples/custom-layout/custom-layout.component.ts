import { JsonPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { date, FluentFormLayoutModule, form, group, input, inputGroup, slider, toggle } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [NgFor, FluentFormLayoutModule, NzGridModule, NzTableModule, JsonPipe],
  templateUrl: './custom-layout.component.html'
})
export class CustomLayoutExampleComponent {
  schema = form(() => {
    inputGroup('name').schemas(() => {
      input('firstName').col(12);
      input('lastName').col(12);
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
