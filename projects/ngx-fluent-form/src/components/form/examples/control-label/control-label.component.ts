import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FluentFormComponent, form, input } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormComponent, NzGridModule, JsonPipe],
  templateUrl: './control-label.component.html'
})
export class ControlLabelExampleComponent {
  schema = form(() => {
    input('text-1').label('普通标签').col(24);
    input('text-2').label({ content: '固定宽度', width: 80 }).col(24);

    input('text-3').label({ content: '右对齐', span: 4 }).col(24);
    input('text-4')
      .label({ content: '附带提示', span: 4 })
      .tooltip('小贴士')
      .col(24);
    input('text-5')
      .label({ content: '自定义图标', span: 4 })
      .tooltip({ content: '小贴士', icon: 'info-circle' })
      .col(24);
  });

  model = {};
}
