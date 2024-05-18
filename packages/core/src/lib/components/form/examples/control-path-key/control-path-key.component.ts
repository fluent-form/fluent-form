import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, FluentGridModule, form, input } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormComponent, FluentGridModule, JsonPipe],
  templateUrl: './control-path-key.component.html'
})
export class ControlPathKeyExampleComponent {
  schema = form(() => {
    input('user.name').label('用户名');
    input('user.password').label('密码').type('password');
  });

  model = {
    user: {
      name: '海森堡'
    }
  };
}
