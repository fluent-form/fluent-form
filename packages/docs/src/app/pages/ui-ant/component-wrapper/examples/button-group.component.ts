import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { button, buttonGroup } from '@fluent-form/ui-zorro';

@Component({
  selector: 'button-group-example',
  standalone: true,
  imports: [FluentFormComponent],
  template: `<fluent-form [schema]="schema" [(model)]="model" />`
})
export class ButtonGroupExampleComponent {
  schema = form(() => {
    buttonGroup().label('Basic').schemas(() => {
      button().type('primary').content('« Previous');
      button().type('primary').content('Next »');
    });

    buttonGroup().label('Different types').schemas(() => {
      button().content('Cancel');
      button().type('primary').content('Confirm');
    });
  })

  model = {};
}
