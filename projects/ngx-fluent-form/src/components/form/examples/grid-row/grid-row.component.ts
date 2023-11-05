import { Component } from '@angular/core';
import { alert, FluentFormComponent, form, heading5, row } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormComponent],
  template: `<fluent-form [(model)]="model" [schema]="schema"></fluent-form>`
})
export class GridRowExampleComponent {
  schema = form(() => {
    heading5().content('Flex');
    row().col(24).schemas(() => {
      alert().message('flex-1').col({ flex: 1 });
      alert().message('flex-2').col({ flex: 2 });
      alert().message('flex-auto').col({ flex: 'auto' });
    });

    heading5().content('排版');
    row().justify('space-between').col(24).schemas(() => {
      alert().message('col-8').col(8);
      alert().message('col-8').col(8);
    });
    row().justify('center').col(24).schemas(() => {
      alert().message('col-8').col(8);
    });
    row().justify('end').col(24).schemas(() => {
      alert().message('col-8').col(8);
    });

    heading5().content('对齐');
    row().align('top').col(24).schemas(() => {
      for (let i = 0; i < 6; i++) {
        if (i % 2 === 0) {
          alert().message('col-4').col(4);
        } else {
          alert().message('col-4').description('align-top').col(4);
        }
      }
    });
    row().align('middle').col(24).schemas(() => {
      for (let i = 0; i < 6; i++) {
        if (i % 2 === 0) {
          alert().message('col-4').col(4);
        } else {
          alert().message('col-4').description('align-middle').col(4);
        }
      }
    });
    row().align('bottom').col(24).schemas(() => {
      for (let i = 0; i < 6; i++) {
        if (i % 2 === 0) {
          alert().message('col-4').col(4);
        } else {
          alert().message('col-4').description('align-bottom').col(4);
        }
      }
    });
  });

  model = {};
}
