import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { button, inputGroup, text } from '@fluent-form/ui-zorro';

@Component({
  selector: 'input-group-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class InputGroupExampleComponent {
  schema = form(() => {
    inputGroup().label('Compact mode').col(4).schemas(() => {
      text('firstName').placeholder('Please enter').col(4);
      text('lastName').placeholder('Please enter').col(8);
    })

    inputGroup().label('With button').col(4).schemas(() => {
      text('keyword').placeholder('Please enter').col('fill');
      button().type('primary').variants({ ghost: true }).content('Search');
    })

    inputGroup().label('With text addon').addons({ before: '$' }).col(4).schemas(() => {
      text('price').placeholder('Please enter').col('fill');
    })

    inputGroup().label('With icon addon').addons({ after: { icon: 'user' } }).col(4).schemas(() => {
      text('username').placeholder('Please enter').col('fill');
    })

    inputGroup().label('With affixes').affixes({ prefix: '￥', suffix: 'RMB' }).col(4).schemas(() => {
      text('rmb').placeholder('Please enter').col('fill');
    })

    inputGroup().label('Multi suffixes').col(6).schemas(() => {
      const fakeText = () => text('_')
        .readonly(true)
        .col({ flex: '75px' })
        .style({ padding: 0, textAlign: 'center', pointerEvents: 'none' });

      text('week').col('fill')
      fakeText().placeholder('周')
      text('day').col('fill')
      fakeText().placeholder('天')
    })
  });

  model = {};
}
