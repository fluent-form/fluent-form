import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent } from '@fluent-form/core';
import { form } from '@fluent-form/ui-zorro';
import json from './schema.json';

@Component({
  selector: 'static-expression-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class StaticExpressionExampleComponent {
  readonly schema = form(json as []);
  readonly model = signal({});
}
