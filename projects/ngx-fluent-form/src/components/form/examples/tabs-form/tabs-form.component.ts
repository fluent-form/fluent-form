import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { button, checkbox, FluentFormComponent, form, input, password, tab, tabs } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormComponent, NzGridModule, JsonPipe],
  templateUrl: './tabs-form.component.html'
})
export class TabsFormExampleComponent {
  schema = form(() => {
    tabs().col(24).schemas(() => {
      tab().title('用户名').schemas(() => {
        input('username').label('用户名').col(24);
        password('password').label('密码').col(24);
      });

      tab().title('手机号').schemas(() => {
        input('cellphone').type('tel').label('手机号').col(24);
        password('password').label('密码').col(24);
      });
    });

    checkbox('remember').content('记住我');
    button().type('primary').content('立即登录').variants({ block: true }).col(24);
  });

  model = {};
}
