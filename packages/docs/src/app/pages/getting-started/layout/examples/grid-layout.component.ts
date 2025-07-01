import { Component, signal } from '@angular/core';
import { FluentFormComponent } from '@fluent-form/core';
import { alert, form } from '@fluent-form/ui-zorro';

@Component({
  selector: 'grid-layout-example',
  imports: [FluentFormComponent],
  template: `<fluent-form [schema]="schema()" [(model)]="model" />`
})
export class GridLayoutExampleComponent {
  readonly schema = form(it => {
    it.align('center').justify('space-between');
    alert().message('col-6').col(4);
    alert().message('col-6').description('align-center').col(4);
    alert().message('col-6').col(4);
  });

  readonly model = signal({});
}
