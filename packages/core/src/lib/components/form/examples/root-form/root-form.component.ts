import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, FluentGridModule, form, group, input, password } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormComponent, FluentGridModule, JsonPipe],
  templateUrl: './root-form.component.html'
})
export class RootFormExampleComponent {
  schema = form(
    group().updateOn('blur').schemas(() => {
      input('username').label('Username');
      password('password').label('Password');
    })
  );

  model = {};
}
