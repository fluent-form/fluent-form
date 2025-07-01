import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent } from '@fluent-form/core';
import { button, form, textField } from '@fluent-form/ui-zorro';

@Component({
  selector: 'update-on-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class UpdateOnExampleComponent {
  readonly schema = form(() => {
    textField('text-1').label('Change').updateOn('change');
    textField('text-2').label('Blur').updateOn('blur');
    textField('text-3').label('Submit').updateOn('submit');

    button().type('primary').content('Submit').col(12);
  });

  readonly model = signal({});
}
