import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { button, input } from '@fluent-form/ui-zorro';

@Component({
  selector: 'control-update-on-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class ControlUpdateOnExampleComponent {
  schema = form(() => {
    input('text-1').label('变更时').updateOn('change');
    input('text-2').label('失焦时').updateOn('blur');
    input('text-3').label('提交时').updateOn('submit');

    button().type('primary').content('提交').col(12);
  });

  model = {};
}
