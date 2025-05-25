import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { button, card, cardsArray, datetimePicker, group, textField } from '@fluent-form/ui-zorro';

@Component({
  selector: 'cards-array-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class CardsArrayExampleComponent {
  readonly schema = form(() => {
    textField('flight').label('航班').col(12);
    datetimePicker('boardingTime').label('登机时间').col(12);

    cardsArray('passengers')
      .label('乘客')
      .length({ max: 5 })
      .col(12)
      .schemas(() => {
        card().col(6).schemas(() => {
          group().col(12).schemas(() => {
            textField('name').label('姓名').placeholder('请输入姓名').col(12);
            textField('cellphone').label('电话').placeholder('请输入电话').col(12);
          });
        })
      });

    button().content('提交').type('primary').col(12).variants({ block: true });
  });

  readonly model = signal({
    passengers: [{}]
  });
}
