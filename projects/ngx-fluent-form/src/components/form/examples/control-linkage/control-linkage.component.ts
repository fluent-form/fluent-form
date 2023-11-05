import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FluentFormComponent, form, input, radioGroup, select, toggle } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormComponent, NzGridModule, JsonPipe],
  templateUrl: './control-linkage.component.html'
})
export class ControlLinkageExampleComponent {
  schema = form(() => {
    radioGroup('lang')
      .label('语言')
      .variants({ button: 'solid' })
      .col(6)
      .defaultValue('zh')
      .options([
        { label: '中文', value: 'zh' },
        { label: '英文', value: 'en' },
      ]);

    select('select')
      .label('控制内容')
      .defaultValue('jack')
      .options(({ model }) => {
        if (model.lang === 'zh') {
          return [
            { label: '杰克', value: 'jack' },
            { label: '露西', value: 'lucy' },
          ];
        }

        return [
          { label: 'Jack', value: 'jack' },
          { label: 'Lucy', value: 'lucy' },
        ];
      })
      .listeners({
        valueChange: (value, control) => {
          control.parent?.get('text')?.setValue(value);
        }
      })
      .col(6);

    radioGroup('show')
      .label('控制显隐')
      .defaultValue(true)
      .options([
        { label: '显示', value: true },
        { label: '隐藏', value: false },
      ])
      .col(6);

    toggle('state').label('状态').placeholder(['启用', '禁用']).col(6);

    input('text')
      .label('文本输入框')
      .hidden(({ model }) => !model.show)
      .disabled(({ model }) => !model.state)
      .col(6);
  });

  model = {};
}
