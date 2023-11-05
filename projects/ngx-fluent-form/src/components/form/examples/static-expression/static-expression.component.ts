import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FluentFormComponent, form } from 'ngx-fluent-form';
import json from './schema.json';

@Component({
  standalone: true,
  imports: [FluentFormComponent, NzGridModule, JsonPipe],
  templateUrl: './static-expression.component.html'
})
export class StaticExpressionExampleComponent {
  schema = form(json as []);

  model = {};
}
