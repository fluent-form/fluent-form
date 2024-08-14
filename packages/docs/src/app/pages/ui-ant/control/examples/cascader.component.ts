import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { cascader } from '@fluent-form/ui-zorro';

@Component({
  selector: 'cascader-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class CascaderExampleComponent {
  schema = form(() => {
    cascader('address')
      .placeholder('Please select')
      .options(OPTIONS)
      .col(4);
    cascader(['province', 'city', 'scenicspots'])
      .placeholder('Please select')
      .options(OPTIONS)
      .col(4);
  });

  model = {};
}

const OPTIONS = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
            isLeaf: true
          }
        ]
      },
      {
        value: 'ningbo',
        label: 'Ningbo',
        children: [
          {
            code: 'dongqianlake',
            name: 'Dongqian Lake',
            isLeaf: true
          }
        ]
      }
    ]
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
            isLeaf: true
          }
        ]
      }
    ]
  }
];
