import { Component } from '@angular/core';
import { array, form, group, input, inputGroup, switcher, textarea } from 'projects/ngx-fluent-form/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() { }

  value = {
    enabled: 'true',
    age: 44,
    details: [
      'aaa'
    ]
  }

  schemas = form(
    switcher('enabled').span(8).placeholder(['有效', '无效']).label('状态').mapper({
      input: (o: string) => o?.includes('true'),
      output: (o: boolean) => o + ' is boolean value'
    }),
    { type: 'number', label: '年龄', name: 'age', value: 99, span: 8 },
    { type: 'number', label: 'hidden', name: 'hidden', value: 99, span: 8, hidden: true },
    inputGroup().label('输入组').span(8).schemas([
      input('text1').placeholder('请输入').span(12),
      input('text2').placeholder('请输入').span(12),
    ]),
    group('info').label('信息').span(24).schemas([
      input('intro').placeholder('请输入').label('简介').value('6666'),
    ]),
    array('details').label('一级列表').span(24).schemas([
      { type: 'input', label: '标题', value: '啊哈哈' },
      group().label('一级列表里的组').schemas([
        { type: 'input', label: '标题', name: 'title' },
        textarea('intro').rows(3).placeholder('请输入').label('简介'),
      ]),
      array().label('二级列表').span(24).schemas([
        group().label('二级列表里的组').schemas([
          { type: 'input', label: '标题', name: 'title' },
          textarea('intro').rows(3).placeholder('请输入').label('简介'),
        ])
      ])
    ])
  );

  ngOnInit(): void { }
}
