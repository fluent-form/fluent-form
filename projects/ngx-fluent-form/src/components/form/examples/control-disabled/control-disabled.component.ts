import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FluentFormComponent, form, input } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormComponent, NzGridModule, JsonPipe],
  templateUrl: './control-disabled.component.html'
})
export class ControlDisabledExampleComponent {
  schema = form(() => {
    input('text-1').disabled(true);
    input('text-2').disabled(() => true);

    input('text-3').disabled(true).hidden(true);
    input('text-4').disabled(true).hidden(({ control }) => control.disabled);
  });

  model = {};
}
