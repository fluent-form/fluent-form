import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { numberField } from '@fluent-form/ui-zorro';

@Component({
  selector: 'number-field-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class NumberFieldExampleComponent {
  readonly schema = form(() => {
    numberField('num')
      .label('Number')
      .placeholder('Please enter number')
      .range({ min: 0, max: 99 })
      .col(4);

    numberField('int')
      .label('Integer')
      .placeholder('Please enter integer')
      .precision(0)
      .col(4);

    numberField('rmb1')
      .label('With affixes')
      .placeholder('Please enter')
      .affixes({ prefix: '￥', suffix: 'RMB' })
      .col(4);

    numberField('rmb2')
      .label('With icon affixes')
      .placeholder('Please enter')
      .affixes({ suffix: { icon: 'setting' } })
      .col(4);

    numberField('cny1')
      .label('With addons')
      .placeholder('Please enter')
      .addons({ before: '￥', after: 'CNY' })
      .col(4);

    numberField('cny2')
      .label('With icon addons')
      .placeholder('Please enter')
      .addons({ after: { icon: 'setting' } })
      .col(4);
  });

  readonly model = signal({});
}
