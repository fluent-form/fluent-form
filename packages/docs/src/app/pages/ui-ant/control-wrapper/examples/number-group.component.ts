import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { button, number, numberGroup, text } from '@fluent-form/ui-zorro';

@Component({
  selector: 'number-group-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class NumberGroupExampleComponent {
  schema = form(() => {
    numberGroup().label('Input group').col(4).schemas(() => {
      number('num1').placeholder('Please enter').col(6);
      number('num2').placeholder('Please enter').col(6);
    });
    numberGroup().label('Number and text').col(4).schemas(() => {
      number('num3').placeholder('Please enter number').col(6);
      text('text').placeholder('Please enter text').col(6);
    });
    numberGroup().label('Input with button').col(4).schemas(() => {
      number('num4').placeholder('Please enter').col('fill');
      button().type('primary').variants({ ghost: true }).content('Confirm');
    });
    numberGroup().label('Input with addons').addons({ before: { icon: 'user' } }).col(4).schemas(() => {
      number('num5').placeholder('Please enter').col('fill');
    })
    numberGroup().label('Input with affixes').affixes({ prefix: '￥', suffix: 'RMB' }).col(4).schemas(() => {
      number('num6').placeholder('Please enter').col('fill');
    })
  });

  model = {};
}
