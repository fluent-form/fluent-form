import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { button, text } from '@fluent-form/ui-zorro';

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
    text('text-1').label('变更时').updateOn('change');
    text('text-2').label('失焦时').updateOn('blur');
    text('text-3').label('提交时').updateOn('submit');

    button().type('primary').content('提交').col(12);
  });

  model = {};
}
