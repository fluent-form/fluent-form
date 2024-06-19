import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { button, input, inputGroup } from '@fluent-form/ui-zorro';

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
    inputGroup().label('姓名').col(4).schemas(() => {
      input('firstName').placeholder('请输入名字').col(4);
      input('lastName').placeholder('请输入姓氏').col(8);
    })
    inputGroup().label('输入框与按钮').col(4).schemas(() => {
      input('keyword').placeholder('请输入关键字').col({ flex: 'auto' });
      button().type('primary').variants({ ghost: true }).content('搜索');
    })
    inputGroup().label('输入框与图标').before({ icon: 'user' }).col(4).schemas(() => {
      input('username').placeholder('请输入').col({ flex: 'auto' });
    })
    inputGroup().label('输入框与修饰符').prefix('￥').suffix('RMB').col(4).schemas(() => {
      input('rmb').placeholder('请输入').col({ flex: 'auto' });
    })
  });

  model = {};
}
