import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { alert, group } from '@fluent-form/ui-zorro';

@Component({
  selector: 'grid-layout-example',
  standalone: true,
  imports: [FluentFormComponent],
  template: `<fluent-form [(model)]="model" [schema]="schema" />`
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
