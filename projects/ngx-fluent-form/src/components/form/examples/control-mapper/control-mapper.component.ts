import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { date, FluentFormComponent, form } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormComponent, NzGridModule, JsonPipe],
  templateUrl: './control-mapper.component.html'
})
export class ControlMapperExampleComponent {
  schema = form(() => {
    date('date').label('日期控件').mapper({
      parser: (input: string | null) => {
        return input ? new Date(input) : new Date();
      },
      formatter: (output: Date | null, schema) => {
        console.log(schema);

        if (!output) return null;
        return [
          output.getFullYear(),
          output.getMonth() + 1,
          output.getDate()
        ].join('/');
      }
    });
  });

  model = {
    date: '2022/2/22'
  };
}
