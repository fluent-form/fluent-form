import { Component } from '@angular/core';
import { array, form, group, switcher, text, textarea } from 'projects/ngx-fluent-form/src/public-api';

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
    switcher('enabled').placeholder(['有效', '无效']).label('状态').mapper({
      input: (o: string) => o?.includes('true'),
      output: (o: boolean) => o + ' is boolean value'
    }),
    { type: 'number', label: '年龄', name: 'age', value: 99 },
    group('info').label('信息').span(24).schemas([
      text('intro').placeholder('请输入').label('简介'),
    ]),
    array('details').label('一级列表').span(24).schemas([
      { type: 'text', label: '标题', name: 0, value: '啊哈哈' },
      group(1).label('一级列表里的组').schemas([
        { type: 'text', label: '标题', name: 'title' },
        textarea('intro').rows(3).placeholder('请输入').label('简介'),
      ]),
      array(2).label('二级列表').span(24).schemas([
        group(0).label('二级列表里的组').schemas([
          { type: 'text', label: '标题', name: 'title' },
          textarea('intro').rows(3).placeholder('请输入').label('简介'),
        ])
      ])
    ])
  )

  ngOnInit(): void { }
}
