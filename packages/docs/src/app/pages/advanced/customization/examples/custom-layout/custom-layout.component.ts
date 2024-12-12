import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormRenderModule, form } from '@fluent-form/core';
import { datePicker, group, slider, spaceCompact, text, toggle } from '@fluent-form/ui-zorro';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'custom-layout-example',
  standalone: true,
  imports: [FluentFormRenderModule, NzTableModule, JsonPipe],
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
      datePicker('birthday');
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
