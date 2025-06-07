import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { textField } from '@fluent-form/ui-zorro';

@Component({
  selector: 'lifecycle-hooks-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class LifecycleHooksExampleComponent {
  readonly schema = form(() => {
    textField('txt')
      .placeholder('Please feel free to enter')
      .hooks({
        onInit: context => console.log('onInit', context),
        onDestroy: context => console.log('onDestroy', context)
      })
      .col(4);
  });

  readonly model = signal({});
}
