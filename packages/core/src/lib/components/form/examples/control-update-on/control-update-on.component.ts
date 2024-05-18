import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { button, FluentFormComponent, FluentGridModule, form, input } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormComponent, FluentGridModule, JsonPipe],
  templateUrl: './control-update-on.component.html'
})
export class ControlUpdateOnExampleComponent {
  schema = form(() => {
    input('text-1').label('变更时').updateOn('change');
    input('text-2').label('失焦时').updateOn('blur');
    input('text-3').label('提交时').updateOn('submit');

    button().type('primary').content('提交').col(12);
  });

  model = {};
}
