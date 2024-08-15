import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { cascader } from '@fluent-form/ui-zorro';
import { tap, timer } from 'rxjs';

@Component({
  selector: 'cascader-async-options-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class CascaderAsyncOptionsExampleComponent {
  schema = form(() => {
    cascader('promise')
      .label('Promise')
      .placeholder('Please select')
      .fetchOptions((node, index) => new Promise<void>(resolve => {
        setTimeout(() => {
          if (index < 0) {
            // if index less than 0 it is root node
            node.children = PROVINCES_OPTIONS;
          } else if (index === 0) {
            node.children = CITIES_OPTIONS[node.value];
          } else {
            node.children = SCENICSPOTS_OPTIONS[node.value];
          }
          resolve();
        }, 500);
      }))
      .col(4);

    cascader('observable')
      .label('Rx Observable')
      .placeholder('Please select')
      .fetchOptions((node, index) => timer(500).pipe(
        tap(() => {
          if (index < 0) {
            // if index less than 0 it is root node
            node.children = PROVINCES_OPTIONS;
          } else if (index === 0) {
            node.children = CITIES_OPTIONS[node.value];
          } else {
            node.children = SCENICSPOTS_OPTIONS[node.value];
          }
        })
      ))
      .col(4);
  });

  model = {};
}

export const PROVINCES_OPTIONS = [
  {
    value: 'zhejiang',
    label: 'Zhejiang'
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu'
  }
];

export const CITIES_OPTIONS: { [key: string]: Array<{ value: string; label: string; isLeaf?: boolean }> } = {
  zhejiang: [
    {
      value: 'hangzhou',
      label: 'Hangzhou'
    },
    {
      value: 'ningbo',
      label: 'Ningbo',
      isLeaf: true
    }
  ],
  jiangsu: [
    {
      value: 'nanjing',
      label: 'Nanjing'
    }
  ]
};

export const SCENICSPOTS_OPTIONS: { [key: string]: Array<{ value: string; label: string; isLeaf?: boolean }> } = {
  hangzhou: [
    {
      value: 'xihu',
      label: 'West Lake',
      isLeaf: true
    }
  ],
  nanjing: [
    {
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
      isLeaf: true
    }
  ]
};
