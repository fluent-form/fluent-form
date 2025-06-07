import { Component, signal } from '@angular/core';
import { FluentFormComponent, form, row } from '@fluent-form/core';
import { alert, heading5 } from '@fluent-form/ui-zorro';

@Component({
  selector: 'grid-row-example',
  imports: [FluentFormComponent],
  template: `<fluent-form [schema]="schema()" [(model)]="model" />`
})
export class GridRowExampleComponent {
  readonly schema = form(() => {
    heading5().content('柔性');
    row().col(12).schemas(() => {
      alert().message('flex-1').col({ flex: 1 });
      alert().message('flex-2').col({ flex: 2 });
      alert().message('fill').col('fill');
    });

    heading5().content('排版');
    row().justify('space-between').col(12).schemas(() => {
      alert().message('col-4').col(4);
      alert().message('col-4').col(4);
    });
    row().justify('center').col(12).schemas(() => {
      alert().message('col-4').col(4);
    });
    row().justify('end').col(12).schemas(() => {
      alert().message('col-4').col(4);
    });

    heading5().content('对齐');
    row().align('start').col(12).schemas(() => {
      for (let i = 0; i < 6; i++) {
        if (i % 2 === 0) {
          alert().message('col-2').col(2);
        } else {
          alert().message('col-2').description('align-start').col(2);
        }
      }
    });
    row().align('center').col(12).schemas(() => {
      for (let i = 0; i < 6; i++) {
        if (i % 2 === 0) {
          alert().message('col-2').col(2);
        } else {
          alert().message('col-2').description('align-center').col(2);
        }
      }
    });
    row().align('end').col(12).schemas(() => {
      for (let i = 0; i < 6; i++) {
        if (i % 2 === 0) {
          alert().message('col-2').col(2);
        } else {
          alert().message('col-2').description('align-end').col(2);
        }
      }
    });
  });

  readonly model = signal({});
}
