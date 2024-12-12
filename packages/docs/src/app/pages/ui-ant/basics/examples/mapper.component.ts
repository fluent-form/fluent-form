import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { datePicker } from '@fluent-form/ui-zorro';

@Component({
  selector: 'mapper-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class MapperExampleComponent {
  schema = form(() => {
    datePicker('date').label('日期控件').mapper({
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
