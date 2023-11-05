import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FluentFormComponent, form, input } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormComponent, NzGridModule, JsonPipe],
  templateUrl: './control-hint.component.html'
})
export class ControlHintExampleComponent {
  schema = form(() => {
    input('text').label('控件标签').hint('这是一段控件提示');
  });

  model = {};
}
