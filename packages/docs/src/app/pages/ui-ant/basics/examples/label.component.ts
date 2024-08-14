import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { group, text } from '@fluent-form/ui-zorro';

@Component({
  selector: 'label-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class LabelExampleComponent {
  schema = form(
    group().layout('horizontal').schemas(() => {
      text('text-1').label('普通标签').col(12);
      text('text-2').label({ content: '固定宽度', width: 80 }).col(12);

      text('text-3').label({ content: '右对齐', span: 4 }).col(12);
      text('text-4')
        .label({ content: '附带提示', span: 4 })
        .tooltip('小贴士')
        .col(12);
      text('text-5')
        .label({ content: '自定义图标', span: 4 })
        .tooltip({ content: '小贴士', icon: 'info-circle' })
        .col(12);
      text('text-6').label({ content: '长文本长文本长文本自动换行', wrap: true, span: 4 }).col(12);
    })
  );

  model = {};
}
