import { Component, signal } from '@angular/core';
import { FluentFormComponent, form, row } from '@fluent-form/core';
import { alert } from '@fluent-form/ui-zorro';

@Component({
  selector: 'grid-gap-example',
  imports: [FluentFormComponent],
  template: `<fluent-form [schema]="schema()" [(model)]="model" />`
})
export class GridGapExampleComponent {
  readonly schema = form(() => {
    row().gap(1).col(12).schemas(() => {
      alert().message('gap-1').col(4);
      alert().message('gap-1').col(4);
      alert().message('gap-1').col(4);
    });

    row().gap(2).col(12).schemas(() => {
      alert().message('gap-2').col(4);
      alert().message('gap-2').col(4);
      alert().message('gap-2').col(4);
    });

    row().gap(3).col(12).schemas(() => {
      alert().message('gap-3').col(4);
      alert().message('gap-3').col(4);
      alert().message('gap-3').col(4);
    });

    row().gap(4).col(12).schemas(() => {
      alert().message('gap-4').col(4);
      alert().message('gap-4').col(4);
      alert().message('gap-4').col(4);
    });

    row().gap(5).col(12).schemas(() => {
      alert().message('gap-5').col(4);
      alert().message('gap-5').col(4);
      alert().message('gap-5').col(4);
    });

    row().gap(6).col(12).schemas(() => {
      alert().message('gap-6').col(4);
      alert().message('gap-6').col(4);
      alert().message('gap-6').col(4);
    });

    row().gap([6, 1]).col(12).schemas(() => {
      for (let i = 0; i < 4 * 2; i++) {
        alert().message(`gap [x: 6, y: 1]`).col(3);
      }
    });
  });

  readonly model = signal({});
}
