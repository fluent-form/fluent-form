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
    inputGroup().label('姓名').col(4).schemas(() => {
      text('firstName').placeholder('请输入名字').col(4);
      text('lastName').placeholder('请输入姓氏').col(8);
    })
    inputGroup().label('输入框与按钮').col(4).schemas(() => {
      text('keyword').placeholder('请输入关键字').col({ flex: 'auto' });
      button().type('primary').variants({ ghost: true }).content('搜索');
    })
    inputGroup().label('输入框与图标').addons({ before: { icon: 'user' } }).col(4).schemas(() => {
      text('username').placeholder('请输入').col({ flex: 'auto' });
    })
    inputGroup().label('输入框与修饰符').affixes({ prefix: '￥', suffix: 'RMB' }).col(4).schemas(() => {
      text('rmb').placeholder('请输入').col({ flex: 'auto' });
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
