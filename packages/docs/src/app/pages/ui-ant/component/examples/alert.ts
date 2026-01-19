import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { alert } from '@fluent-form/ui-zorro';

@Component({
  selector: 'alert-example',
  imports: [FluentFormComponent],
  template: `<fluent-form [schema]="schema()" [(model)]="model" />`
})
export class AlertExampleComponent {
  readonly schema = form(() => {
    alert().type('success').message('Success Text');
    alert().type('info').message('Info Text').icon(true);
    alert().type('warning').message('Warning Text');
    alert().type('error').message('Error Text');
    alert().type('success').message('Success Text').closeable(true);
    alert()
      .type('error')
      .message('Error Text')
      .description(
        'Error Description Error Description Error Description Error Description Error Description Error Description'
      );
  });

  readonly model = signal({});
}
