import { Component } from '@angular/core';
import { alert, FluentFormComponent, form, group } from 'ngx-fluent-form';

@Component({
  selector: 'fluent-form-grid-layout-example',
  standalone: true,
  imports: [FluentFormComponent],
  template: `
    <fluent-form [(model)]="model" [schema]="schema"></fluent-form>
  `
})
export class GridLayoutExampleComponent {
  schema = form(
    group().align('center').justify('space-between').schemas(() => {
      alert().message('col-6').col(4);
      alert().message('col-6').description('align-center').col(4);
      alert().message('col-6').col(4);
    })
  );

  model = {};
}
