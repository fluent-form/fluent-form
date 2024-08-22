import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { radioGroup, select, text, toggle } from '@fluent-form/ui-zorro';

@Component({
  selector: 'linkage-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class LinkageExampleComponent {
  schema = form(() => {
    radioGroup('lang')
      .label('Change language')
      .variants({ button: 'solid' })
      .col(3)
      .defaultValue('zh')
      .options([
        { label: '中文', value: 'zh' },
        { label: 'English', value: 'en' },
      ]);

    select('content')
      .label('Change value')
      .defaultValue('jack')
      .options(({ model }) => {
        if (model.lang === 'zh') {
          return [
            { label: '杰克', value: 'jack' },
            { label: '露西', value: 'lucy' },
          ];
        }

        return [
          { label: 'Jack', value: 'jack' },
          { label: 'Lucy', value: 'lucy' },
        ];
      })
      .col(3);

    radioGroup('visible')
      .label('Change visible')
      .defaultValue(true)
      .options([
        { label: 'Show', value: true },
        { label: 'Hide', value: false },
      ])
      .col(3);

    toggle('status').label('Change status').placeholder(['Enabled', 'Disabled']).col(3);

    text('target')
      .label('Target control')
      .readonly(true)
      .hidden(({ model }) => !model.visible)
      .disabled(({ model }) => !model.status)
      .value(({ model }) => model.content)
      .col(3);
  });

  model = {};
}
