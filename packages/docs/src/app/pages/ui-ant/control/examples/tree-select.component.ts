import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { treeSelect } from '@fluent-form/ui-zorro';

@Component({
  selector: 'tree-select-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class TreeSelectExampleComponent {
  readonly schema = form(() => {
    treeSelect('value')
      .placeholder('Please select')
      .options(OPTIONS)
      .expandedKeys(['100', '1001'])
      .col(4);
  });

  readonly model = signal({});
}

const OPTIONS = [
  {
    title: 'parent 1',
    key: '100',
    children: [
      {
        title: 'parent 1-0',
        key: '1001',
        children: [
          { title: 'leaf 1-0-0', key: '10010', isLeaf: true },
          { title: 'leaf 1-0-1', key: '10011', isLeaf: true }
        ]
      },
      {
        title: 'parent 1-1',
        key: '1002',
        children: [{ title: 'leaf 1-1-0', key: '10020', isLeaf: true }]
      }
    ]
  }
];
