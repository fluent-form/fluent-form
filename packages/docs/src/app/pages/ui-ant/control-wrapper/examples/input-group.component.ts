import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { button, inputGroup, number, text } from '@fluent-form/ui-zorro';

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
      text('txt1').placeholder('Please enter').addons({ before: '@' }).col(6);
      text('txt2').placeholder('Please enter').affixes({ prefix: '@' }).col(6);
    })
    inputGroup().label('Number compact mode').col(4).schemas(() => {
      number('price').placeholder('Please enter').affixes({ prefix: '#' }).col(6);
      number('price').placeholder('Please enter').addons({ before: '#' }).col(6);
    })
    inputGroup().label('Text & number compact mode').col(4).schemas(() => {
      text('price').placeholder('Please enter').col(6);
      number('price').placeholder('Please enter').col(6);
    })

    inputGroup().label('With button').col(4).schemas(() => {
      text('keyword').placeholder('Please enter').affixes({ prefix: '@' }).col('fill');
      button().type('primary').variants({ ghost: true }).content('Search');
    })
    inputGroup().label('Number with button').col(4).schemas(() => {
      number('keyword').placeholder('Please enter').affixes({ prefix: '#' }).col('fill');
      button().type('primary').variants({ ghost: true }).content('Search');
    })
    inputGroup().label('Text & Number with button').col(4).schemas(() => {
      text('keyword').placeholder('Please enter').col('fill');
      number('keyword').placeholder('Please enter').col('fill');
      button().type('primary').variants({ ghost: true }).content('Search');
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
