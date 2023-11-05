import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FluentFormComponent, form, input, password } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormComponent, NzGridModule, JsonPipe],
  templateUrl: './root-form.component.html'
})
export class RootFormExampleComponent {
  schema = form(
    () => {
      input('username').label('Username');
      password('password').label('Password');
    },
    { updateOn: 'blur' }
  );

  model = {};
}
