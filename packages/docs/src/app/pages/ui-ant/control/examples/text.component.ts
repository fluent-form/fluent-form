import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { text } from '@fluent-form/ui-zorro';

@Component({
  selector: 'text-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class TextExampleComponent {
  schema = form(() => {
    text('name').label('Text').placeholder('Please enter').col(4);
    text('pwd').type('password').label('Password').placeholder('Please enter').col(4);

    text('rmb1')
      .label('With affixes')
      .placeholder('Please enter')
      .affixes({ prefix: '￥', suffix: 'RMB' })
      .col(4);

    text('rmb2')
      .label('With icon affixes')
      .placeholder('Please enter')
      .affixes({ suffix: { icon: 'setting' } })
      .col(4);

    text('cny1')
      .label('With addons')
      .placeholder('Please enter')
      .addons({ before: '￥', after: 'CNY' })
      .col(4);

    text('cny2')
      .label('With icon addons')
      .placeholder('Please enter')
      .addons({ after: { icon: 'setting' } })
      .col(4);
  });

  model = {};
}
