import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent } from '@fluent-form/core';
import { form, textArea } from '@fluent-form/ui-zorro';

@Component({
  selector: 'text-area-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class TextAreaExampleComponent {
  readonly schema = form(() => {
    textArea('desc')
      .label('Description')
      .placeholder('Please fill in')
      .rows(3)
      .col(6);
  });

  readonly model = signal({});
}
