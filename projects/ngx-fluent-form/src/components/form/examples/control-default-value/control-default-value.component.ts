import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FluentFormComponent, form, input } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormComponent, NzGridModule, JsonPipe],
  templateUrl: './control-default-value.component.html'
})
export class ControlDefaultValueExampleComponent {
  schema = form(() => {
    input('text').defaultValue('默认值');
  });

  model = {};
}
