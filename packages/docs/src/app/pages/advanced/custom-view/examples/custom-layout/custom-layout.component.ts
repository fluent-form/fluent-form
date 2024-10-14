import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormLayoutModule, form } from '@fluent-form/core';
import { date, group, slider, spaceCompact, text, toggle } from '@fluent-form/ui-zorro';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'custom-layout-example',
  standalone: true,
  imports: [FluentFormLayoutModule, NzTableModule, JsonPipe],
  templateUrl: './custom-layout.component.html'
})
export class CustomLayoutExampleComponent {
  schema = form(() => {
    spaceCompact('name').schemas(() => {
      text('firstName').col(6);
      text('lastName').col(6);
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
