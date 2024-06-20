import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { alert, heading5 } from '@fluent-form/ui-zorro';

@Component({
  selector: 'grid-col-example',
  standalone: true,
  imports: [FluentFormComponent],
  template: `<fluent-form [(model)]="model" [schema]="schema" />`
})
export class GridColExampleComponent {
  schema = form(() => {
    heading5().content('基本');
    alert().message('col-3').col(3);
    alert().message('col-4').col(4);
    alert().message('col-5').col(5);

    heading5().content('偏移');
    alert().message('col-3-offset-3').col({ span: 3, offset: 3 });
    alert().message('col-3-offset-3').col({ span: 3, offset: 3 });
  });

  model = {};
}
