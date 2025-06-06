import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormModule, form } from '@fluent-form/core';
import { applyGroup, button, textField } from '@fluent-form/ui-zorro';

@Component({
  selector: 'label-example',
  standalone: true,
  imports: [FluentFormModule, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model">
      <ng-template fluentTemplate="labelTmpl">
        <strong>自定义模板</strong>
      </ng-template>
    </fluent-form>
    <pre>{{ model() | json }}</pre>
  `
})
export class LabelExampleComponent {
  readonly schema = form(() => {
    applyGroup({ layout: 'horizontal' });

    textField('text-1').label('普通标签').col(12);
    textField('text-2').label({ content: '固定宽度', width: 80 }).col(12);
    textField('text-3').label({ content: '右对齐', span: 4 }).col(12);
    textField('text-4')
      .label({ content: '附带提示', span: 4 })
      .tooltip('小贴士')
      .col(12);
    textField('text-5')
      .label({ content: '自定义图标', span: 4 })
      .tooltip({ content: '小贴士', icon: 'info-circle' })
      .col(12);
    textField('text-6').label({ content: '长文本长文本长文本自动换行', wrap: true, span: 4 }).col(12);
    textField('text-7').label('#labelTmpl').col(12);

    button().type('primary').label({ span: 4 }).content('Submit').variants({ block: true });
  });

  readonly model = signal({});
}
