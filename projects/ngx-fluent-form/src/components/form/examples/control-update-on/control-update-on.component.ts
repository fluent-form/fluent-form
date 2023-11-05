import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { button, FluentFormComponent, form, input } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormComponent, NzGridModule, JsonPipe],
  templateUrl: './control-update-on.component.html'
})
export class ControlUpdateOnExampleComponent {
  schema = form(() => {
    input('text-1').label('变更时').updateOn('change');
    input('text-2').label('失焦时').updateOn('blur');
    input('text-3').label('提交时').updateOn('submit');

    button().type('primary').content('提交').col(24);
  });

  model = {};
}
