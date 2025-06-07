import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { button, buttonGroup } from '@fluent-form/ui-zorro';

@Component({
  selector: 'button-group-example',
  imports: [FluentFormComponent],
  template: `<fluent-form [schema]="schema()" [(model)]="model" />`
})
export class ButtonGroupExampleComponent {
  readonly schema = form(() => {
    buttonGroup().label('Basic').schemas(() => {
      button().type('primary').content('« Previous');
      button().type('primary').content('Next »');
    });

    buttonGroup().label('Different types').schemas(() => {
      button().content('Cancel');
      button().type('primary').content('Confirm');
    });
  });

  readonly model = signal({});
}
