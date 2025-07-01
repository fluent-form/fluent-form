import { Component, signal } from '@angular/core';
import { FluentFormComponent } from '@fluent-form/core';
import { alert, form } from '@fluent-form/ui-zorro';

@Component({
  selector: 'grid-offset-example',
  imports: [FluentFormComponent],
  template: `<fluent-form [schema]="schema()" [(model)]="model" />`
})
export class GridOffsetExampleComponent {
  readonly schema = form(() => {
    alert().message('col-3-offset-3').col({ span: 3, offset: 3 });
    alert().message('col-3-offset-3').col({ span: 3, offset: 3 });
  });

  readonly model = signal({});
}
