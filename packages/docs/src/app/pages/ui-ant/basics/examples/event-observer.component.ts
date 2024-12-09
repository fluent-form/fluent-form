import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { select, text } from '@fluent-form/ui-zorro';

@Component({
  selector: 'event-observer-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class EventObserverExampleComponent {
  schema = form(() => {
    text('txt')
      .placeholder('Please feel free to enter')
      .observers({
        valueChange: source => {
          source.subscribe(value => console.log('valueChange', value))
        },
        statusChange: source => {
          source.subscribe(value => console.log('statusChange', value))
        },
        focus: source => {
          source.subscribe(value => console.log('focus', value))
        }
      })
      .col(4);

    select('user')
      .placeholder('Please select user')
      .options([
        { label: 'Jack', value: 'jack' },
        { label: 'lucy', value: 'lucy' },
        { label: 'Mike', value: 'mike' },
      ])
      .observers({
        nzOpenChange: source => {
          source.subscribe(value => console.log('nzOpenChange', value))
        }
      })
      .col(4);
  });

  model = {};
}
