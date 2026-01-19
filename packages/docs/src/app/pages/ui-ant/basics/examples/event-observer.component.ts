import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { select, textField } from '@fluent-form/ui-zorro';
import { tap } from 'rxjs';

@Component({
  selector: 'event-observer-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class EventObserverExampleComponent {
  readonly schema = form(() => {
    textField('txt')
      .placeholder('Please feel free to enter')
      .observers({
        valueChange: source => source.pipe(
          tap(value => console.log('valueChange', value))
        ),
        statusChange: source => source.pipe(
          tap(value => console.log('statusChange', value))
        ),
        focus: source => source.pipe(
          tap(value => console.log('focus', value))
        )
      })
      .col(4);

    select('user')
      .placeholder('Please select user')
      .options([
        { label: 'Jack', value: 'jack' },
        { label: 'lucy', value: 'lucy' },
        { label: 'Mike', value: 'mike' }
      ])
      .observers({
        nzOpenChange: source => source.pipe(
          tap(value => console.log('nzOpenChange', value))
        )
      })
      .col(4);
  });

  readonly model = signal({});
}
