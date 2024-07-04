import { Component } from '@angular/core';
import { FluentFormComponent, form, row } from '@fluent-form/core';
import { alert } from '@fluent-form/ui-zorro';

@Component({
  selector: 'grid-responsive-example',
  standalone: true,
  imports: [FluentFormComponent],
  template: `<fluent-form [(model)]="model" [schema]="schema" />`
})
export class GridResponsiveExampleComponent {
  schema = form(() => {
    row().col('fill').gap({ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }).schemas(() => {
      alert().message('col-6, col-md-4').col({ xs: 6, md: 4 });
      alert().message('col-6, col-md-4').col({ xs: 6, md: 4 });
      alert().message('col-12, col-md-4').col({ xs: 12, md: 4 });
    });
  });

  model = {};
}
