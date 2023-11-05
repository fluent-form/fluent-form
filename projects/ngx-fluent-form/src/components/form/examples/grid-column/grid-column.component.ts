import { Component } from '@angular/core';
import { alert, FluentFormComponent, form, heading5 } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormComponent],
  template: `<fluent-form [(model)]="model" [schema]="schema"></fluent-form>`
})
export class GridColExampleComponent {
  schema = form(() => {
    heading5().content('基本');
    alert().message('col-6').col(6);
    alert().message('col-8').col(8);
    alert().message('col-10').col(10);

    heading5().content('偏移');
    alert().message('col-6-offset-6').col({ span: 6, offset: 6 });
    alert().message('col-6-offset-6').col({ span: 6, offset: 6 });

    heading5().content('左右平移');
    alert().message('col-18-push-6').col({ span: 18, push: 6 });
    alert().message('col-6-pull-18').col({ span: 6, pull: 18 });
  });

  model = {};
}
