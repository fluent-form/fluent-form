import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { button, input, number, numberGroup } from '@fluent-form/ui-zorro';

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
    numberGroup().label('数值').col(4).schemas(() => {
      number('num1').placeholder('请输入数字').col(6);
      number('num2').placeholder('请输入数字').col(6);
    });
    numberGroup().label('数值与文本').col(4).schemas(() => {
      number('num3').placeholder('请输入数字').col(6);
      input('text').placeholder('请输入文本').col(6);
    });
    numberGroup().label('输入框与按钮').col(4).schemas(() => {
      number('num4').placeholder('请输入数字').col({ flex: 'auto' });
      button().type('primary').variants({ ghost: true }).content('确认');
    });
    numberGroup().label('输入框与图标').before({ icon: 'user' }).col(4).schemas(() => {
      number('num5').placeholder('请输入数字').col({ flex: 'auto' });
    })
    numberGroup().label('输入框与修饰符').prefix('￥').suffix('RMB').col(4).schemas(() => {
      number('num6').placeholder('请输入数字').col({ flex: 'auto' });
    })
  });

  model = {};
}
