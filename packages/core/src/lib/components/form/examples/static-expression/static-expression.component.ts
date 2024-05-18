import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, FluentGridModule, form } from 'ngx-fluent-form';
import json from './schema.json';

@Component({
  standalone: true,
  imports: [FluentFormComponent, FluentGridModule, JsonPipe],
  templateUrl: './static-expression.component.html'
})
export class StaticExpressionExampleComponent {
  schema = form(json as []);

  model = {};
}
