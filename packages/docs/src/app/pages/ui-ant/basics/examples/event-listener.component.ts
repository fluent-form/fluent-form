import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent } from '@fluent-form/core';
import { form, select, textField } from '@fluent-form/ui-zorro';

@Component({
  selector: 'event-listener-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class EventListenerExampleComponent {
  readonly schema = form(() => {
    textField('txt')
      .placeholder('Please feel free to enter')
      .listeners({
        valueChange: (value, context) => {
          console.log('valueChange', { value, context });
        },
        statusChange: (status, context) => {
          console.log('statusChange', { status, context });
        },
        focus: (event, context) => {
          console.log('focus', { event, context });
        }
      })
      .col(4);

    select('user')
      .placeholder('Please select user')
      .options([
        { label: 'Jack', value: 'jack' },
        { label: 'lucy', value: 'lucy' },
        { label: 'Mike', value: 'mike' }
      ])
      .listeners({
        nzOpenChange: (event, context) => {
          console.log('nzOpenChange', { event, context });
        }
      })
      .col(4);
  });

  readonly model = signal({});
}
