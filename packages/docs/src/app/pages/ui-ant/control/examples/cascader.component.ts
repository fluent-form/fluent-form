import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { cascader } from '@fluent-form/ui-zorro';

@Component({
  selector: 'cascader-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class CascaderExampleComponent {
  readonly schema = form(() => {
    cascader('address')
      .placeholder('Please select')
      .options(OPTIONS)
      .col(4);
    cascader('address2')
      .placeholder('Please select')
      .options(OPTIONS)
      .mode('multiple')
      .col(4);
    cascader(['province', 'city', 'scenicspots'])
      .placeholder('Please select')
      .options(OPTIONS)
      .col(4);
  });

  readonly model = signal({});
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
            value: 'dongqianlake',
            label: 'Dongqian Lake',
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
