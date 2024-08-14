import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { cascader } from '@fluent-form/ui-zorro';

@Component({
  selector: 'cascader-custom-property-names-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class CascaderCustomPropertyNamesExampleComponent {
  schema = form(() => {
    cascader('address')
      .placeholder('Please select')
      .options(OPTIONS)
      .config({ labelProperty: 'name', valueProperty: 'code' })
      .col(4);
  });

  model = {};
}

const OPTIONS = [
  {
    code: 'zhejiang',
    name: 'Zhejiang',
    children: [
      {
        code: 'hangzhou',
        name: 'Hangzhou',
        children: [
          {
            code: 'xihu',
            name: 'West Lake',
            isLeaf: true
          }
        ]
      },
      {
        code: 'ningbo',
        name: 'Ningbo',
        isLeaf: true
      }
    ]
  },
  {
    code: 'jiangsu',
    name: 'Jiangsu',
    children: [
      {
        code: 'nanjing',
        name: 'Nanjing',
        children: [
          {
            code: 'zhonghuamen',
            name: 'Zhong Hua Men',
            isLeaf: true
          }
        ]
      }
    ]
  }
];
