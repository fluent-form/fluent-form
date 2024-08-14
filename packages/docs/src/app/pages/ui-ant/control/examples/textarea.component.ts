import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { textarea } from '@fluent-form/ui-zorro';

@Component({
  selector: 'textarea-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class TextareaExampleComponent {
  schema = form(() => {
    textarea('desc')
      .label('Description')
      .placeholder('Please fill in')
      .rows(3)
      .col(4);
  });

  model = {};
}
