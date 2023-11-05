import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FluentFormComponent, form, group, input, number } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormComponent, NzGridModule, JsonPipe],
  templateUrl: './form-group.component.html'
})
export class FormGroupExampleComponent {
  schema = form(() => {
    input('name').label('用户名').col(24);
    number('age').label('年龄').col(24);

    group('info').label('其他信息').col(24).schemas(() => {
      input('cellphone').type('tel').label('手机号').col(12);
      input('email').type('email').label('邮箱').col(12);
    });
  });

  model = {};
}
