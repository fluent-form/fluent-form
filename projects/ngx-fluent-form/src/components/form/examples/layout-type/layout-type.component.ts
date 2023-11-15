import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FluentFormComponent, form, input } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormComponent, NzGridModule, JsonPipe],
  templateUrl: './layout-type.component.html'
})
export class LayoutTypeExampleComponent {
  schema = form(() => {
    input('text-1').label('控件标签').col(12);
    input('text-2').label('控件标签').col(12);
    input('text-3').label('控件标签').col(12);
  });

  model = {};
}
