import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent } from '@fluent-form/core';
import { datePicker, form } from '@fluent-form/ui-zorro';

@Component({
  selector: 'mapper-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class MapperExampleComponent {
  readonly schema = form(() => {
    datePicker('date').label('Date').mapper({
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

  readonly model = signal({
    date: '2022/2/22'
  });
}
