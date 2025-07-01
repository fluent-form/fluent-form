import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent } from '@fluent-form/core';
import { button, form, group, tabsArray, textField } from '@fluent-form/ui-zorro';

@Component({
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class TabsArrayExampleComponent {
  readonly schema = form(() => {
    tabsArray('passengers')
      .label('Passengers')
      .length({ max: 5 })
      .col(12)
      .schemas(() => {
        group().col(12).schemas(() => {
          textField('name').label('Name').placeholder('Please enter').col(12);
          textField('cellphone').label('Cellphone').placeholder('Please enter').col(12);
        });
      });

    button().content('Submit').type('primary').col(12).variants({ block: true });
  });

  readonly model = signal({
    passengers: [
      {
        name: '李四',
        cellphone: '13800138000'
      }
    ]
  });
}
