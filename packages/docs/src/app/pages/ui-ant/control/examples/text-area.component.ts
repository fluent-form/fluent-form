import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { textArea } from '@fluent-form/ui-zorro';

@Component({
  selector: 'text-area-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class TextAreaExampleComponent {
  schema = form(() => {
    textArea('desc')
      .label('Description')
      .placeholder('Please fill in')
      .rows(3)
      .col(6);
  });

  model = {};
}
