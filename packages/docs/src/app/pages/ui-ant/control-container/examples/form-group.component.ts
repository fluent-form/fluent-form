import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { button, group, input, number } from '@fluent-form/ui-zorro';

@Component({
  selector: 'form-group-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class FormGroupExampleComponent {
  schema = form(() => {
    input('name').label('用户名').col(12);
    number('age').label('年龄').col(12);

    group('info').label('其他信息').col(12).schemas(() => {
      input('cellphone').type('tel').label('手机号').col(6);
      input('email').type('email').label('邮箱').col(6);
    });

    button().content('提交').type('primary').variants({ block: true });
  });

  model = {};
}
