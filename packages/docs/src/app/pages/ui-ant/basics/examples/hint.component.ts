import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent } from '@fluent-form/core';
import { form, textField } from '@fluent-form/ui-zorro';

@Component({
  selector: 'hint-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class HintExampleComponent {
  readonly schema = form(() => {
    textField('text').hint('This is a hint message for the text field.');
  });

  readonly model = signal({});
}
