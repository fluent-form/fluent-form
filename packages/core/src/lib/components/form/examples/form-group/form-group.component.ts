import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, FluentGridModule, button, form, group, input, number } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormComponent, FluentGridModule, JsonPipe],
  templateUrl: './form-group.component.html'
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
