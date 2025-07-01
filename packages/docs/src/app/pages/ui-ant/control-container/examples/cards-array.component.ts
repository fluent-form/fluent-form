import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent } from '@fluent-form/core';
import { button, card, cardsArray, datetimePicker, form, group, textField } from '@fluent-form/ui-zorro';

@Component({
  selector: 'cards-array-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class CardsArrayExampleComponent {
  readonly schema = form(() => {
    textField('flight').label('Flight').col(12);
    datetimePicker('boardingTime').label('Boarding time').col(12);

    cardsArray('passengers')
      .label('Passengers')
      .length({ max: 5 })
      .col(12)
      .schemas(() => {
        card().col(12).schemas(() => {
          group().col(12).schemas(() => {
            textField('name').label('Name').placeholder('Please enter').col(12);
            textField('cellphone').label('Cellphone').placeholder('Please enter').col(12);
          });
        });
      });

    button().content('Submit').type('primary').col(12).variants({ block: true });
  });

  readonly model = signal({
    passengers: [{}]
  });
}
