import { Component } from '@angular/core';
import { alert, FluentFormComponent, form } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormComponent],
  template: `
    <fluent-form
      justify="space-between"
      [align]="'middle'"
      [(model)]="model"
      [schema]="schema">
    </fluent-form>
  `
})
export class GridLayoutExampleComponent {
  schema = form(() => {
    alert().message('col-6').col(6);
    alert().message('col-6').description('align-center').col(6);
    alert().message('col-6').col(6);
  });

  model = {};
}
